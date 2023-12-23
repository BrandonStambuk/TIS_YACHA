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
            $table->unsignedBigInteger('tipo_evento_dinamico_id')->nullable();
            $table->unsignedBigInteger('tipo_competencia_dinamica_id')->nullable();
            $table->string('tipo_modalidad');
            $table->text('descripcion_evento_dinamico');
            $table->string('lugar_evento_dinamico');
            $table->integer('cantidad_participantes_evento_dinamico');
            $table->boolean('mostrar_publico')->default(false);
            $table->boolean('requiere_coach')->default(false);
            $table->string('afiche', 500)->nullable();
            $table->timestamps();

            $table->foreign('tipo_evento_dinamico_id')
                ->references('id')->on('tipo_evento_dinamicos')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->foreign('tipo_competencia_dinamica_id')
                ->references('id')->on('tipo_competencia_dinamicos')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            // Agregar una restricción para asegurarse de que solo uno de los dos sea nulo
            //$table->unique(['tipo_evento_dinamico_id', 'tipo_competencia_dinamica_id']);
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
