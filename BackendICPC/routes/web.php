<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/listaEventos', function () {
    return view('index');
});


Route::get('/listaCompetencias', function () {
    return view('index');
});



Route::get('/home', function () {
    return view('index');
});

Route::get('/registerUsuario', function () {
    return view('index');
});

