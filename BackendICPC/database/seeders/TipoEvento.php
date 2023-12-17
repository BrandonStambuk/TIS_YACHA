<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

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
            'nombre_tipo_evento_dinamico' => 'Taller de reclutamiento',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Competencia de entrenamiento',
        ]);
        DB::table('tipo_evento_dinamicos')->insert([
            'nombre_tipo_evento_dinamico' => 'Competencia interna',
        ]);
    }
}
