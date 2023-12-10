<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RequisitosEvento;

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
        $requisito->maximo_valor = $request->maximo_valor;
        $requisito->minimo_valor = $request->minimo_valor;
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
        $requisito->maximo_valor = $request->maximo_valor;
        $requisito->minimo_valor = $request->minimo_valor;
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
        RequisitosEvento::destroy($id);
    }
}
