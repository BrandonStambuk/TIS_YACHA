<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventoDinamicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evento_dinamicos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_evento_dinamico');
            $table->unsignedBigInteger('tipo_evento_dinamico_id');
            $table->timestamps();

            $table->foreign('tipo_evento_dinamico_id')->references('id')->on('tipo_evento_dinamicos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evento_dinamicos');
    }
}
