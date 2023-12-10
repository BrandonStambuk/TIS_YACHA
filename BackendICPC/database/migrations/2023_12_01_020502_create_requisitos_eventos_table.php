<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequisitosEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requisitos_eventos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_requisito');
            $table->string('descripcion_requisito');
            $table->string('tipo_requisito');
            $table->string('maximo_valor')->nullable();
            $table->string('minimo_valor')->nullable();
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
        Schema::dropIfExists('requisitos_eventos');
    }
}
