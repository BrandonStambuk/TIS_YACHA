<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EtapaEvento;
use App\Models\FechaInscripcionEvento;

class EtapaEventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $etapas = EtapaEvento::with(['fechaInscripcionEvento'])->get();
        return $etapas;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $etapa = new EtapaEvento();
        $etapa->fecha_inicio_etapa = $request->fecha_inicio_etapa;
        $etapa->fecha_fin_etapa = $request->fecha_fin_etapa;
        $etapa->hora_inicio_etapa = $request->hora_inicio_etapa;
        $etapa->hora_fin_etapa = $request->hora_fin_etapa;
        $etapa->contenido_etapa = $request->contenido_etapa;
        $etapa->etapa_fecha_inscripcion_eventos_id = $request->etapa_fecha_inscripcion_eventos_id;
        $etapa->save();
        return $etapa;
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
            $etapaEvento = EtapaEvento::findOrFail($id);

            $etapaEvento->delete();

            return response()->json(['message' => 'Etapa dinámico eliminado correctamente'], 200);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getTrace());
            return response()->json(['message' => 'Etapa al eliminar el Fecha dinámico', 'error' => $e->getMessage()], 500);
        }
    }
}
