<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtapaEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etapa_eventos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio_etapa');
            $table->date('fecha_fin_etapa');
            $table->time('hora_inicio_etapa');
            $table->time('hora_fin_etapa');
            $table->string('contenido_etapa')->nullable();
            $table->unsignedBigInteger('etapa_fecha_inscripcion_eventos_id');
            $table->timestamps();
            $table->foreign('etapa_fecha_inscripcion_eventos_id')->references('id')->on('fecha_inscripcion_eventos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('etapa_eventos');
    }
}
