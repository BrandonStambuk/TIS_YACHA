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
use App\Http\Controllers\Api\RequisitoController;
use App\Http\Controllers\Api\DetalleRequisitoController;
use App\Http\Controllers\Api\InscripcionController;
use App\Http\Controllers\Api\ParticipanteController;
use App\Http\Controllers\Api\OtroRequisitoController;
use App\Http\Controllers\Api\NoticiaController;
use App\Http\Controllers\Api\ForgotPasswordController;
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
  Route::get('/eventosDinamicosPublicos', 'indexPublico');
  Route::post('/crearEventoDinamico', 'store');
  Route::delete('/eliminarEventoDinamico/{id}', 'destroy');
  Route::put('/actualizarEventoDinamico/{id}', 'update');
  Route::get('/eventosDinamicos/{id}', 'show');
});

Route::controller(TipoEventoDinamicoController::class)->group(function (){
  Route::get('/tipoEventosDinamicos', 'index');
  Route::post('/crearTipoEventoDinamico', 'store');
  Route::delete('/eliminarTipoEventoDinamico/{id}', 'destroy');
  Route::put('/actualizarTipoEventoDinamico/{id}', 'update');
});

Route::controller(NoticiaController::class)->group(function (){
  Route::get('/noticiasDisponibles', 'index');
  Route::post('/crearNoticia', 'store');
  Route::delete('/eliminarNoticia/{id}', 'destroy');
  Route::put('/actualizarNoticia/{id}', 'update');
  Route::get('/noticia/{id}', 'show');
  //Route::put('/actualizarTipoEventoDinamico/{id}', 'update');
});

Route::controller(FechaInscripcionEventoController::class)->group(function (){
  Route::get('/fechasInscripcion', 'index');
  Route::post('/crearFechaInscripcion', 'store');
  Route::delete('/eliminarFechaInscripcion/{id}', 'destroy');
  Route::put('/actualizarFechaInscripcion/{id}', 'update');
  Route::get('/fechasInscripcion/{id}', 'show');
});
Route::controller(EtapaEventoController::class)->group(function (){
  Route::get('/etapasEvento', 'index');
  Route::post('/crearEtapaEvento', 'store');
  Route::delete('/eliminarEtapaEvento/{id}', 'destroy');
  Route::put('/actualizarEtapaEvento/{id}', 'update');
});


Route::controller(RequisitoController::class)->group(function (){
  Route::get('/requisitos', 'index');
  Route::post('/crearRequisito', 'store');
  Route::delete('/eliminarRequisito/{id}', 'destroy');
  Route::delete('/eliminarTodoRequisito/{id}', 'destroyAll');
  Route::put('/actualizarRequisito/{id}', 'update');
  Route::get('/requisitos/{id}', 'show');
});

Route::controller(DetalleRequisitoController::class)->group(function (){
  Route::get('/detalleRequisitos', 'index');
  Route::post('/crearDetalleRequisito', 'store');
  Route::put('/actualizarDetalleRequisito/{id}', 'update');
  Route::delete('/eliminarDetalleRequisito/{id}', 'destroy');
});

Route::controller(InscripcionController::class)->group(function (){
  Route::get('/inscripciones', 'index');
  Route::post('/crearInscripcion', 'store');
  Route::delete('/eliminarInscripcion/{id}', 'destroy');
  Route::put('/actualizarInscripcion/{id}', 'update');
  Route::get('/inscripciones/{id}', 'show');
});

Route::controller(ParticipanteController::class)->group(function (){
  Route::get('/participantes', 'index');
  Route::post('/crearParticipante', 'store');
  Route::delete('/eliminarParticipante/{id}', 'destroy');
  Route::put('/actualizarParticipante/{id}', 'update');
  Route::get('/participantes/{id}', 'show');
});
Route::controller(OtroRequisitoController::class)->group(function (){
  Route::get('/otroRequisitos', 'index');
  Route::post('/crearOtroRequisito', 'store');
  Route::delete('/eliminarOtroRequisito/{id}', 'destroy');
  Route::put('/actualizarOtroRequisito/{id}', 'update');
  Route::get('/otroRequisitos/{id}', 'show');
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
Route::post('upload', [App\Http\Controllers\ImageController::class, 'upload']);
Route::get('getImage/{id}', [App\Http\Controllers\ImageController::class, 'get']);
Route::get('getImagen/{name}', [App\Http\Controllers\ImageController::class, 'getImage']);
Route::get('getImageNoticia/{id}', [App\Http\Controllers\ImageController::class, 'getNoticia']);

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

Route::post('/forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post');
Route::post('/restore', [ForgotPasswordController::class, 'submitResetPasswordForm']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});