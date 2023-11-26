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
        // Validación de campos
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|unique:users,email', 
            'role' => 'required|string',
            'password' => 'required|string',
        ], [
            'email.unique' => 'El correo electrónico ya está registrado. Por favor, elige otro.',
        ]);
    
        // Crear el usuario solo si la validación pasa
        return User::create([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'role' => $request->input('role'),
            'password' => bcrypt($request->input('password')),
        ]);
    }

    public function login(Request $request) {

        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
        
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'message' => 'Success',
            'token' => $token, // Incluye el token en la respuesta
            'user_id' => $user->id,
        ]);
    }

    public function user(){
        return Auth::user();
    }

    public function logout(){
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
    public function show($id)
    {
        $user = User::findOrFail($id);
        return $user;
    }
    public function update(Request $request, $id)
    {
        $user=User::findOrFail($id);
        $user->email = $request->email;
        $user->save();
    }

    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->password = bcrypt($request->password);
        $user->save();
    }

    public function destroy($id)
    {       
         $usuario = User::find($id);

        if ($usuario) {
            $usuario->delete();
            return response()->json(['message' => 'Usuario eliminado con éxito'], 200);
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }
}
