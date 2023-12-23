<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOtroRequisitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('otro_requisitos', function (Blueprint $table) {
            $table->id();
            $table->String('valor');
            $table->unsignedBigInteger('requisitos_eventos_id');
            $table->unsignedBigInteger('paticipantes_id');
            $table->timestamps();
            $table->foreign('requisitos_eventos_id')->references('id')->on('requisitos_eventos');
            $table->foreign('paticipantes_id')->references('id')->on('paticipantes');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('otro_requisitos');
    }
}
