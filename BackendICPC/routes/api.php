<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\UsuarioController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(EventoController::class)->group(function (){
    Route::get('/eventos', 'index');
    Route::get('/mostrarPublico', 'publicar');
    Route::post('/crearevento', 'store');
    Route::get('/crearevento/{id}', 'show');
    //Route::get('/crearevento/{id}', 'get');
    Route::put('/crearevento/{id}', 'update');
    Route::delete('/eventos/{id}', 'destroy');
});

Route::controller(UsuarioController::class)->group(function (){
    Route::get('/usuarios', 'index');
    Route::post('/crearusuario', 'store');
    //Route::get('/crearusuario/{id}', 'show');
    //Route::put('/crearusuario/{id}', 'update');
    //Route::delete('/usuarios/{id}', 'destroy');
});