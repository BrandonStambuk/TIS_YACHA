<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\CompetenciaController;
use App\Http\Controllers\Api\EventoDinamicoController;
use App\Http\Controllers\Api\TipoEventoDinamicoController;
use App\Http\Controllers\Api\FechaInscripcionEventoController;
use App\Http\Controllers\Api\EtapaEventoController;

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

Route::controller(EventoDinamicoController::class)->group(function (){
  Route::get('/eventosDinamicos', 'index');
  Route::post('/crearEventoDinamico', 'store');
  Route::delete('/eliminarEvento/{id}', 'destroy');
});

Route::controller(TipoEventoDinamicoController::class)->group(function (){
  Route::get('/tipoEventosDinamicos', 'index');
  Route::post('/crearTipoEventoDinamico', 'store');
  Route::delete('/eliminarTipoEventoDinamico/{id}', 'destroy');
  Route::put('/actualizarTipoEventoDinamico/{id}', 'update');
});
Route::controller(FechaInscripcionEventoController::class)->group(function (){
  
  Route::post('/crearFechaInscripcion', 'store');
  Route::delete('/eliminarFecha/{id}', 'destroy');
});
Route::controller(EtapaEventoController::class)->group(function (){
  
  Route::post('/crearEtapaEvento', 'store');
  Route::delete('/eliminarEtapa/{id}', 'destroy');
});


Route::controller(EventoController::class)->group(function (){
    Route::get('/eventos', 'index');
    Route::get('/mostrarPublico', 'publicar');
    Route::get('/mostrarPublicoPasados', 'publicarPasados');
    Route::post('/crearevento', 'store');
    Route::get('/crearevento/{id}', 'show');
    //Route::get('/crearevento/{id}', 'get');
    Route::put('/crearevento/{id}', 'update');
    Route::delete('/eventos/{id}', 'destroy');
});
Route::controller(CompetenciaController::class)->group(function (){
  Route::get('/competencias', 'index');
  Route::post('/crearcompe', 'store');
  Route::get('/crearcompe/{id}', 'show');
  Route::put('/crearcompe/{id}', 'update');
  Route::delete('/competencias/{id}', 'destroy');
});
Route::controller(EquipoController::class)->group(function (){
  Route::get('/createEquipo', 'index');
  Route::post('/createEquipo', 'store');
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
    Route::get('/usuarioss', 'index');
    Route::post('/crearusuario', 'store');
    //Route::get('/crearusuario/{id}', 'show');
    //Route::put('/crearusuario/{id}', 'update');
    //Route::delete('/usuarioss/{id}', 'destroy');
    Route::delete('/usuarioss/{id}', [App\Http\Controllers\AuthController::class, 'destroy']);
});

Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::get('usuarioss', [App\Http\Controllers\AuthController::class, 'index']);
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::controller(AuthController::class)->group(function (){
  Route::get('/perfil/{id}', 'show');
  Route::post('/perfil/{id}', 'update');
  Route::post('/perfil/password/{id}', 'updatePassword');
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
    //Route::get('eventos', [App\Http\Controllers\EventoController::class, 'index']);
    //Route::get('/eventos', [App\Http\Controllers\EventoController::class, 'index']);
    //Route::get('/listaEventos', 'EventoController@index');
    //Route::get('/crearafiche', 'EventoController@crearafiche');
});
Route::controller(EstudianteController::class)->group(function (){
    Route::post('/crearestudiante', 'store');
    Route::get('/crearestudiante/{id}', 'show');
    Route::put('/crearestudiante/{id}', 'update');
    Route::delete('/estudiantes/{id}', 'destroy');
});





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});