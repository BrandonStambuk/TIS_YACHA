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
}
