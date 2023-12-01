<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoDinamico extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_evento_dinamico',
        'tipo_evento_dinamico_id',
        'fecha_inscripcion_eventos_id'
    ];
}
