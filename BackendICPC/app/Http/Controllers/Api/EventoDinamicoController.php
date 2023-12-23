<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventoDinamico;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;
use App\Models\Inscripcion;
use App\Notifications\ChangeNotification;

class EventoDinamicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventos = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento'])->get();

    return $eventos;
    }

    public function indexPublico()
    {
        $eventos = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento' => function ($query) {
            $query->where('fecha_fin_inscripcion', '>=', today());
        }])
        ->where('mostrar_publico', true)
        ->whereHas('fechaInscripcionEvento', function ($query) {
            $query->where('fecha_fin_inscripcion', '>=', today());
        })
        ->get();
    
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
        $evento->descripcion_evento_dinamico = $request->descripcion_evento_dinamico;
        $evento->lugar_evento_dinamico = $request->lugar_evento_dinamico;
        $evento->cantidad_participantes_evento_dinamico = $request->cantidad_participantes_evento_dinamico;
        $evento->mostrar_publico = $request->mostrar_publico;
        $evento->afiche= $request->afiche;
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
        $evento = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento', 'detalleRequisitos.requisitosEvento' ])->find($id);
        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
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
        $evento = EventoDinamico::findOrFail($request->id);
        $evento->nombre_evento_dinamico = $request->nombre_evento_dinamico;
        $evento->tipo_evento_dinamico_id = $request->tipo_evento_dinamico_id;
        $evento->descripcion_evento_dinamico = $request->descripcion_evento_dinamico;
        $evento->lugar_evento_dinamico = $request->lugar_evento_dinamico;
        $evento->cantidad_participantes_evento_dinamico = $request->cantidad_participantes_evento_dinamico;
        $evento->mostrar_publico = $request->mostrar_publico;
        $evento->afiche= $request->afiche;
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
        $evento = EventoDinamico::find($id);

        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
            $evento->detalleRequisitos()->delete();
            $evento->fechaInscripcionEvento->each(function ($fechaInscripcion) {
            $fechaInscripcion->etapaEvento()->delete();
        });
    
        $evento->fechaInscripcionEvento()->delete();
        $evento->delete();
    
        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }

    public function notificarCambios(Request $request)
    {
        $inscripciones = Inscripcion::where('evento_dinamico_id', $request->evento_dinamico_id)->get();
        $evento = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento'])->find($request->evento_dinamico_id);
        $eventoEditLink = 'http://localhost:8080/eventos-dinamicos/' . $request->evento_dinamico_id . '/edit';
        foreach ($inscripciones as $inscripcion) {
            $inscripcion->user->notify(new ChangeNotification($eventoEditLink));
        }
        return response()->json(['message' => 'Notificación enviada con éxito'], 200);
    }

}
