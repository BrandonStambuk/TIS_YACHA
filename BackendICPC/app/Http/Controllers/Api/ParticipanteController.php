<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paticipante;

class ParticipanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $participante = new Paticipante();
        $participante->nombre = $request->nombre;
        $participante->apellido = $request->apellido;
        $participante->correo = $request->correo;
        //$participante->correo_institucional = $request->correo_institucional;
        $participante->telefono_celular = $request->telefono_celular;
        /*$participante->institucion = $request->institucion;
        $participante->codigo_sis = $request->codigo_sis;
        $participante->carrera = $request->carrera;
        $participante->semestre = $request->semestre;*/
        $participante->fecha_nacimiento = $request->fecha_nacimiento;
        $participante->inscripcions_id = $request->inscripcions_id;
        $participante->save();
        return $participante;
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
        //
    }
}
