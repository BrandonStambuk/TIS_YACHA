<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RequisitosEvento;
use App\Models\DetalleRequisitos;

class RequisitoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $requisito = RequisitosEvento::all();
        return $requisito;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requisito = new RequisitosEvento();
        $requisito->nombre_requisito = $request->nombre_requisito;
        $requisito->descripcion_requisito = $request->descripcion_requisito;
        $requisito->tipo_requisito = $request->tipo_requisito;
        $requisito->valor_minimo = $request->valor_minimo;
        $requisito->valor_maximo = $request->valor_maximo;
        $requisito->save();
        return $requisito;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $requisito = RequisitosEvento::find($id);
        return $requisito;
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
        $requisito = RequisitosEvento::find($id);
        $requisito->nombre_requisito = $request->nombre_requisito;
        $requisito->descripcion_requisito = $request->descripcion_requisito;
        $requisito->tipo_requisito = $request->tipo_requisito;
        $requisito->valor_minimo = $request->valor_minimo;
        $requisito->valor_maximo = $request->valor_maximo;
        $requisito->save();
        return $requisito;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $referencias = DetalleRequisitos::where('id_requisito', $id)->count();
        if ($referencias > 0) {
            return response()->json(['error' => 'No se puede eliminar el requisito. Está siendo utilizado en un evento.'], 422);
        }
        RequisitosEvento::destroy($id);
        return response()->json(['message' => 'El requisito fue eliminado correctamente']);
    }

    public function destroyAll($id)
    {
        RequisitosEvento::destroy($id);

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
}
