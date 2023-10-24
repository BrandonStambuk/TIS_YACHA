<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\AuthController;
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



Route::controller(EventoController::class)->group(function (){
    Route::get('/eventos', 'index');
    Route::get('/mostrarPublico', 'publicar');
    Route::post('/crearevento', 'store');
    Route::get('/crearevento/{id}', 'show');
    //Route::get('/crearevento/{id}', 'get');
    Route::put('/crearevento/{id}', 'update');
    Route::delete('/eventos/{id}', 'destroy');
});
Route::post('/upload', function (Request $request) {
    if (!$request->hasFile('image')) {
      return response()->json(['upload_file_not_found'], 400);
    }
    $file = $request->file('image');
    if (!$file->isValid()) {
      return response()->json(['invalid_file_upload'], 400);
    }
    $path = '/uploads/' . $file->getClientOriginalName();
    Storage::disk('public')->put($path, file_get_contents($file));
  
    return response()->json(['path' => $path], 200);
  });
Route::controller(UsuarioController::class)->group(function (){
    Route::get('/usuarios', 'index');
    Route::post('/crearusuario', 'store');
    //Route::get('/crearusuario/{id}', 'show');
    //Route::put('/crearusuario/{id}', 'update');
    //Route::delete('/usuarios/{id}', 'destroy');
});

Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::get('usuarioss', [App\Http\Controllers\AuthController::class, 'index']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
});





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});