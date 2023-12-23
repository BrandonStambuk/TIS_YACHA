<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TipoCompetenciaDinamico;

class TipoCompetenciaDinamicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoCompetencia = TipoCompetenciaDinamico::all();
        return $tipoCompetencia;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tipoCompetencia = new TipoCompetenciaDinamico();
        $tipoCompetencia->nombre_tipo_competencia_dinamico = $request->nombre_tipo_competencia_dinamico;
        $tipoCompetencia->save();
        return $tipoCompetencia;
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
            $tipoCompetencia = TipoCompetenciaDinamico::findOrFail($id);
            $tipoCompetencia->nombre_tipo_competencia_dinamico = $request->nombre_tipo_competencia_dinamico;
            $tipoCompetencia->save();
            return response()->json(['message' => 'Tipo de competencia actualizado con éxito'], 200);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getTrace());
            return response()->json(['message' => 'Error al actualizar el tipo de competencia', 'error' => $e->getMessage()], 500);
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
        try {$tipoCompetencia = TipoCompetenciaDinamico::findOrFail($id);
            $tipoCompetencia->delete();
            return response()->json(['message' => 'Tipo de competencia eliminado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el tipo de competencia', 'error' => $e->getMessage()], 500);
        }
    }
}
