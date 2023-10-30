<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        return User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

    }

        public function login(Request $request) {
            /*$credentials = $request->only('email','password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;
                $cookie = cookie('jwt', $token, 60 * 24); // 1 day
                return response(['message' => 'Inicio de sesión exitoso'], Response::HTTP_OK)->withCookie($cookie);
            }

            return response(['message' => 'Credenciales incorrectas'], Response::HTTP_UNAUTHORIZED);*/

            if(!Auth::attempt($request->only('name','password'))){
                return response([
                    'message' => 'Invalid credentials'
                ], Response::HTTP_UNAUTHORIZED);
            }
            
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            
            return response([
                'message' => 'Success',
                'token' => $token, // Incluye el token en la respuesta
            ]);
        }

    public function user(){
        return Auth::user();
    }

    public function logout(){
        /*$cookie = Cookie::forget('jwt');
        return response([
            'message' => 'Success'
        ])->withCookie($cookie);*/
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function index()
    {
        $users = User::all();
        return $users;
    }
}
