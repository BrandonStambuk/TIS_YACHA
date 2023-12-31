<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DetalleRequisitos;

class DetalleRequisitoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $detalleRequisito = new DetalleRequisitos();
        $detalleRequisito->id_evento_dinamico = $request->id_evento_dinamico;
        $detalleRequisito->id_requisito = $request->id_requisito;
        $detalleRequisito->save();
        return $detalleRequisito;
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
        $detalleRequisito = DetalleRequisitos::find($id);
        $detalleRequisito->id_evento_dinamico = $request->id_evento_dinamico;
        $detalleRequisito->id_requisito = $request->id_requisito;
        $detalleRequisito->save();
        return $detalleRequisito;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $detalleRequisito = DetalleRequisitos::find($id);
        $detalleRequisito->delete();
        
    }
}
