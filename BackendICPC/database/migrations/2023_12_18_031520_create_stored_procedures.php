<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoredProcedures extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            CREATE PROCEDURE getEventosActivos()
            BEGIN
                SELECT *
                FROM evento_dinamicos
                WHERE id IN (
                    SELECT evento_dinamicos_id 
                    FROM fecha_inscripcion_eventos 
                    WHERE fecha_fin_inscripcion > CURDATE()
                );
            END
        ');

        DB::unprepared('
            CREATE PROCEDURE getEventosPasados()
            BEGIN
                SELECT *
                FROM evento_dinamicos
                WHERE id IN (
                    SELECT evento_dinamicos_id 
                    FROM fecha_inscripcion_eventos 
                    WHERE fecha_fin_inscripcion < CURDATE()
                );
            END
        ');

        DB::unprepared('
            CREATE PROCEDURE getEventosPorGestion(IN year INT)
            BEGIN
                SELECT *
                FROM evento_dinamicos
                WHERE id IN (
                    SELECT evento_dinamicos_id 
                    FROM fecha_inscripcion_eventos 
                    WHERE YEAR(fecha_fin_inscripcion) = year
                );
            END
        ');

        DB::unprepared('
            CREATE PROCEDURE getEventosPorTipo(IN idt INT)
            BEGIN
                SELECT *
                FROM evento_dinamicos
                WHERE tipo_evento_dinamico_id = idt;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS getEventosActivos');
        DB::unprepared('DROP PROCEDURE IF EXISTS getEventosPasados');
        DB::unprepared('DROP PROCEDURE IF EXISTS getEventosPorGestion');
        DB::unprepared('DROP PROCEDURE IF EXISTS getEventosPorTipo');
    }
}