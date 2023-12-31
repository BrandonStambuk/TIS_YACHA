<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFechaInscripcionEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fecha_inscripcion_eventos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio_inscripcion');
            $table->date('fecha_fin_inscripcion');
            $table->unsignedBigInteger('evento_dinamicos_id');
            $table->timestamps();

            $table->foreign('evento_dinamicos_id')->references('id')->on('evento_dinamicos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fecha_inscripcion_eventos');
    }
}
