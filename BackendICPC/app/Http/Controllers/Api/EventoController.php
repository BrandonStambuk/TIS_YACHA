<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evento;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $evento = Evento::all();
        return $evento;
    }

    public function publicar()
{
    $evento = Evento::where('publico', 1)->get();
    
    return $evento;
}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $evento = new Evento();
        $evento->nombre_evento = $request->nombre_evento;
        $evento->tipo_evento = $request->tipo_evento;
        $evento->fecha_inicio_inscripcion = $request->fecha_inicio_inscripcion;
        $evento->fecha_fin_inscripcion = $request->fecha_fin_inscripcion;
        $evento->fecha_inicio_evento = $request->fecha_inicio_evento;
        $evento->fecha_fin_evento = $request->fecha_fin_evento;
        $evento->hora = $request->hora;
        $evento->descripcion = $request->descripcion;
        $evento->publico = $request->publico;
        $evento->save();
        return $evento;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $evento = Evento::findOrFail($id);
        return $evento;
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
        $evento = Evento::findOrFail($request->id);
        $evento->nombre_evento = $request->nombre_evento;
        $evento->tipo_evento = $request->tipo_evento;
        $evento->fecha_inicio = $request->fecha_inicio;
        $evento->fecha_fin = $request->fecha_fin;
        $evento->hora = $request->hora;
        $evento->descripcion = $request->descripcion;
        $evento->publico = $request->publico;
        $evento->save();
        return $evento;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $evento = Evento::destroy($id);
        return $evento;
    }

    /*public function get(){
        $evento = Evento::all();
        return $evento;
    }*/
}
