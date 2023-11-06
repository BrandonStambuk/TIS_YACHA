<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompetenciaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competencias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_competencia');
            $table->integer('integrantes_competencia');
            $table->date('fecha_inicio_competencia');
            $table->date('fecha_fin_competencia');
            $table->string('horas_competencia');
            $table->string('descripcion_competencia');
            $table->boolean('publicado_competencia')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competencias');
    }
}
