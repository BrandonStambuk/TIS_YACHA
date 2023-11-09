<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Competencia;

class CompetenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $competencia = Competencia::all();
        return $competencia;
    }

    public function publicar()
{
    $competencia = Competencia::where('publicado_competencia', 1)->get();
    
    return $competencia;
}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $competencia = new Competencia();
        $competencia->nombre_competencia = $request->nombre_competencia;
        $competencia->integrantes_competencia = $request->integrantes_competencia;
        $competencia->fecha_inicio_competencia = $request->fecha_inicio_competencia;
        $competencia->fecha_fin_competencia = $request->fecha_fin_competencia;
        $competencia->horas_competencia = $request->horas_competencia;
        $competencia->descripcion_competencia = $request->descripcion_competencia;
        $competencia->publicado_competencia = $request->publicado_competencia;
        $competencia->save();
        return $competencia;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $competencia = Competencia::findOrFail($id);
        return $competencia;
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
        $competencia = Competencia::findOrFail($request->id);
        $competencia->nombre_competencia = $request->nombre_competencia;
        $competencia->integrantes_competencia = $request->integrantes_competencia;
        $competencia->fecha_inicio_competencia = $request->fecha_inicio_competencia;
        $competencia->fecha_fin_competencia = $request->fecha_fin_competencia;
        $competencia->horas_competencia = $request->horas_competencia;
        $competencia->descripcion_competencia = $request->descripcion_competencia;
        $competencia->publicado_competencia = $request->publicado_competencia;
        $competencia->save();
        return $competencia;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $competencia = Competencia::destroy($id);
        return $competencia;
    }
}
