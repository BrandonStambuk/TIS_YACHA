<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_evento', 'tipo_evento', 'fecha_inicio_inscripcion', 'fecha_fin_inscripcion','fecha_inicio_evento','fecha_fin_evento','hora' , 'descripcion', 'publico'];
}
