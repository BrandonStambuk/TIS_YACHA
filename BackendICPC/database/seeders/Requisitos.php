<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Requisitos extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       /* DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'correo institucional',
            'descripcion_requisito' => 'correo del participante de la UMSS',
            'tipo_requisito' => 'alfanumerico'
        ]);*/
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'telefono celular',
            'descripcion_requisito' => 'numero telefonico del participante',
            'tipo_requisito' => 'Número'
        ]);
       /* DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'institucion',
            'descripcion_requisito' => 'instiucion a la que pertenece el participante',
            'tipo_requisito' => 'Caracteres'
        ]);
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'codigo SIS',
            'descripcion_requisito' => 'codigo SIS del participante',
            'tipo_requisito' => 'Número'
        ]);*/
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'carrera',
            'descripcion_requisito' => 'carrera a la que pertenece el participante',
            'tipo_requisito' => 'Caracteres'
        ]);
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'fecha de nacimiento',
            'descripcion_requisito' => 'fecha de nacimiento del participante',
            'tipo_requisito' => 'Fecha'
        ]);
    }
}
