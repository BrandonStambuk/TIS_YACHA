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
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'Teléfono celular',
            'descripcion_requisito' => 'Número telefónico del participante',
            'tipo_requisito' => 'Número'
        ]);
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'Carrera',
            'descripcion_requisito' => 'Carrera a la que pertenece el participante',
            'tipo_requisito' => 'Caracteres'
        ]);
        DB::table('requisitos_eventos')->insert([
            'nombre_requisito' => 'Fecha de nacimiento',
            'descripcion_requisito' => 'Fecha de nacimiento del participante para validar edad mayor a 18 años',
            'tipo_requisito' => 'Fecha'
        ]);
    }
}
