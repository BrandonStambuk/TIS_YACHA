<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FechaInscripcionEvento;
use App\Models\EtapaEvento;
use App\Models\EventoDinamico;

class FechaInscripcionEventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fechas = FechaInscripcionEvento::with(['eventoDinamico', 'etapaEvento'])->get();
        return $fechas;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fecha = new FechaInscripcionEvento();
        $fecha->fecha_inicio_inscripcion = $request->fecha_inicio_inscripcion;
        $fecha->fecha_fin_inscripcion = $request->fecha_fin_inscripcion;
        $fecha->evento_dinamicos_id = $request->evento_dinamicos_id;
        $fecha->save();
        return $fecha;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
