<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inscripcion;
use App\Models\Paticipante;
use App\Models\EventoDinamico;
use Illuminate\Support\Facades\DB;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inscripciones = Inscripcion::with(['eventoDinamico'])->get();
        return $inscripciones;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inscripcion= new Inscripcion();
        $inscripcion->nombre_equipo = $request->nombre_equipo;
        $inscripcion->evento_dinamicos_id = $request->evento_dinamicos_id;
        $inscripcion->save();
        return $inscripcion;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $inscripcion = Inscripcion::with(['eventoDinamico', 'participantes',])->find($id);
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
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();
    }
    public function getParticipantesPorEvento($idEvento) {
        $participantes = DB::table('paticipantes')
            ->join('inscripcions', 'paticipantes.inscripcions_id', '=', 'inscripcions.id')
            ->join('evento_dinamicos', 'inscripcions.evento_dinamicos_id', '=', 'evento_dinamicos.id')
            ->where('evento_dinamicos.id', $idEvento)
            ->select('paticipantes.nombre', 'paticipantes.apellido', 'inscripcions.nombre_equipo', 'inscripcions.problemas_resueltos', 'inscripcions.penalidad')
            ->get();
    
        return $participantes;
    }
    public function setNotas(Request $request, $id) {
        $inscripcion = Inscripcion::findOrFail($id);
        if(isset($request->problemas_resueltos)){
            $inscripcion->problemas_resueltos = $request->problemas_resueltos;
        }
        if(isset($request->penalidad)){
            $inscripcion->penalidad = $request->penalidad;
        }
        $inscripcion->save();
        return $inscripcion;
    }
}
