<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TipoEvento extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Reclutamiento',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Taller de entrenamiento',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Competencia de entrenamiento',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Clasificatorios internos',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Competencia Oficial ICPC',
        ]);
    }
}
