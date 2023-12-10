<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TipoEventoDinamico;

class TipoEventoDinamicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoEvento = TipoEventoDinamico::all();
        return $tipoEvento;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tipoEvento = new TipoEventoDinamico();
        $tipoEvento->nombre_tipo_evento_dinamico = $request->nombre_tipo_evento_dinamico;
        $tipoEvento->save();
        return $tipoEvento;
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
        try {
            $tipoEvento = TipoEventoDinamico::findOrFail($id);
            $tipoEvento->nombre_tipo_evento_dinamico = $request->nombre_tipo_evento_dinamico;
            $tipoEvento->save();
            return response()->json(['message' => 'Tipo de evento actualizado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el tipo de evento'], 500);
        }
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
            $tipoEvento = TipoEventoDinamico::findOrFail($id);
            $tipoEvento->delete();
            return response()->json(['message' => 'Tipo de evento dinámico eliminado correctamente'], 200);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getTrace());
            return response()->json(['message' => 'Error al eliminar el tipo de evento dinámico', 'error' => $e->getMessage()], 500);
        }
    }
}
