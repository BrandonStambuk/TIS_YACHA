<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventoDinamico;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;
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
        $evento = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento', 'detalleRequisitos' ])->find($id);
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

    public function notificationEditEvent(Request $request){
        $evento = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento', 'detalleRequisitos' ])->find($request->id);
        $evento->fechaInscripcionEvento->each(function ($fechaInscripcion) {
            $fechaInscripcion->etapaEvento()->delete();
        });
        $evento->fechaInscripcionEvento()->delete();
        $evento->detalleRequisitos()->delete();
        $evento->save();
        $evento->load(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento', 'detalleRequisitos' ]);
        $eventoEditLink = 'http://localhost:8080/#/eventos-dinamicos/'.$evento->id.'/edit';
        $evento->notify(new ChangeNotification($eventoEditLink));
        return $evento;
    }
}
