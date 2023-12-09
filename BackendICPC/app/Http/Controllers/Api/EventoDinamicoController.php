<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventoDinamico;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;

class EventoDinamicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventos = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEventos'])->get();

    return $eventos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $evento = new EventoDinamico();
        $evento->nombre_evento_dinamico = $request->nombre_evento_dinamico;
        $evento->tipo_evento_dinamico_id = $request->tipo_evento_dinamico_id;
        $evento->fecha_inscripcion_eventos_id = $request->fecha_inscripcion_eventos_id;
        $evento->descripcion_evento_dinamico = $request->descripcion_evento_dinamico;
        $evento->lugar_evento_dinamico = $request->lugar_evento_dinamico;
        $evento->cantidad_participantes_evento_dinamico = $request->cantidad_participantes_evento_dinamico;
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
        try {
            $eventoDinamico = EventoDinamico::findOrFail($id);

            $eventoDinamico->delete();

            return response()->json(['message' => 'Evento dinámico eliminado correctamente'], 200);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getTrace());
            return response()->json(['message' => 'Error al eliminar el evento dinámico', 'error' => $e->getMessage()], 500);
        }
    }
}
