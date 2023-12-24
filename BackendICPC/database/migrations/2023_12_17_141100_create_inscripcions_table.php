<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscripcionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscripcions', function (Blueprint $table) {
            $table->id();
            $table->String('nombre_equipo')->nullable();
            $table->unsignedBigInteger('evento_dinamicos_id');
            $table->integer('problemas_resueltos')->nullable();
            $table->integer('penalidad')->nullable();
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
        Schema::dropIfExists('inscripcions');
    }
}
