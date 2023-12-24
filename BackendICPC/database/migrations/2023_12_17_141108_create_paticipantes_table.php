<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaticipantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paticipantes', function (Blueprint $table) {
            $table->id();
            $table->String('nombre');
            $table->String('apellido');
            $table->String('correo')->nullable();
            $table->String('telefono_celular')->nullable();
            $table->date('fecha_nacimiento')->nullable();           
            $table->unsignedBigInteger('inscripcions_id');
            $table->timestamps();
            $table->foreign('inscripcions_id')->references('id')->on('inscripcions')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paticipantes');
    }
}
