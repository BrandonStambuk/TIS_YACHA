<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Notifications\ForgetEmailNotification;
use App\Models\PassworResets;
use Illuminate\Support\Facades\Password;
use Illuminate\Notifications\Notifiable;


class ForgotPasswordController extends Controller
{
    public function submitForgetPasswordForm(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $token = Str::random(64);

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => now()
        ]);

        $nextJsDomain = 'http://localhost:3000';
        $resetPasswordLink = "{$nextJsDomain}/restore?email={$request->email}&token={$token}";

        $user = User::where('email', $request->email)->first();
        $user->notify(new ForgetEmailNotification($resetPasswordLink));

        return response()->json(['message' => 'Hemos enviado un enlace para restablecer su contraseña por correo electrónico.', 'token' => $token, 'email' => $request->email], 200);
    }

    public function submitResetPasswordForm(Request $request)
    {

          $updatePassword = DB::table('password_resets')
                              ->where([
                                'email' => $request->email,
                                'token' => $request->token
                              ])
                              ->first();

          if(!$updatePassword){
              return back()->withInput()->with('error', 'Invalid token!');
          }

          $user = User::where('email', $request->email)
                      ->update(['password' => Hash::make($request->password)]);

          DB::table('password_resets')->where(['email'=> $request->email])->delete();

          return response()->json(['message' => 'Contraseña actualizada con éxito'], 200);
    }
}
