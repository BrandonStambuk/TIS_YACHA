<?php

namespace Database\Seeders;

use Database\Seeders\usuario;
use Database\Seeders\TipoEvento;
use Database\Seeders\Requisitos;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(usuario::class);
        $this->call(TipoEvento::class);
        $this->call(Requisitos::class);
    }
}
