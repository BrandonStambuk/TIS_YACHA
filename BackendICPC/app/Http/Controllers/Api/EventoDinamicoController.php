<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventoDinamico;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;
use App\Models\Inscripcion;
use App\Notifications\ChangeNotification;
use App\Notifications\DeleteEvent;
use App\Models\Paticipante;
use Illuminate\Notifications\Notifiable;
use App\Notifications\ForgetEmailNotification;

class EventoDinamicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventos = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento'])
        ->whereHas('tipoEventoDinamico', function ($query) {
            $query->where('nombre_tipo_evento_dinamico','!=','Competencia oficial ICPC');
        })
        ->get();

        return $eventos;
    }

    public function indexCompetencia()
    {
        $eventos = EventoDinamico::with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento'])
        ->whereHas('tipoEventoDinamico', function ($query) {
            $query->where('nombre_tipo_evento_dinamico', 'Competencia oficial ICPC');
        })
        ->get();

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
        $evento->requiere_coach = $request->requiere_coach;
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
        $evento->requiere_coach = $request->requiere_coach;
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
        $evento->delete();    
        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }

    public function existeInscripciones($id)
    {
        $inscripciones = Inscripcion::where('evento_dinamicos_id', $id)->get();
        if ($inscripciones->isEmpty()) {
            return false;
        }
        return true;
    }

    public function notificarCambios($id, Request $request)
    {
        $evento = EventoDinamico::find($id);
        $eventoNombre = $evento->nombre_evento_dinamico;
        $eventoTipo = $evento->tipoEventoDinamico->nombre_tipo_evento_dinamico;
        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
        $inscripciones = Inscripcion::where('evento_dinamicos_id', $id)->get();
        if ($inscripciones->isEmpty()) {
            return response()->json(['message' => 'No hay inscripciones para este evento'], 404);
        }
        $participantes = Paticipante::whereIn('inscripcions_id', $inscripciones->pluck('id'))->get();
        if ($participantes->isEmpty()) {
            return response()->json(['message' => 'No hay participantes para este evento'], 404);
        }
        $eventoLink = "http://localhost:3000/mostrar/{$evento->id}";
        $personalizedMessage = $request->personalizedMessage;
        
        foreach ($participantes as $participante) {
            $participante->notify(new ChangeNotification($eventoLink, $personalizedMessage, $eventoNombre, $eventoTipo));
        }
        
        return response()->json(['message' => 'Notificaciones enviadas con éxito'], 200);
    }

    public function notificarEliminado($id, Request $request)
    {
        $evento = EventoDinamico::find($id);
        $eventoNombre = $evento->nombre_evento_dinamico;
        $eventoTipo = $evento->tipoEventoDinamico->nombre_tipo_evento_dinamico;
        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
        $inscripciones = Inscripcion::where('evento_dinamicos_id', $id)->get();
        if ($inscripciones->isEmpty()) {
            return response()->json(['message' => 'No hay inscripciones para este evento'], 404);
        }
        $participantes = Paticipante::whereIn('inscripcions_id', $inscripciones->pluck('id'))->get();
        if ($participantes->isEmpty()) {
            return response()->json(['message' => 'No hay participantes para este evento'], 404);
        }
        $personalizedMessage = $request->personalizedMessage;
        $nombreEvento = $evento->nombre_evento_dinamico;
        
        foreach ($participantes as $participante) {
            $participante->notify(new DeleteEvent($nombreEvento, $personalizedMessage, $eventoNombre, $eventoTipo));
        }
        
        return response()->json(['message' => 'Notificaciones enviadas con éxito'], 200);
    }


}