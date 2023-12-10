<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleRequisitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_requisitos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_evento_dinamico');
            $table->unsignedBigInteger('id_requisito');
            $table->timestamps();
            $table->foreign('id_evento_dinamico')->references('id')->on('evento_dinamicos');
            $table->foreign('id_requisito')->references('id')->on('requisitos_eventos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_requisitos');
    }
}
