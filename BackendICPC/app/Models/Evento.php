<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_evento', 'tipo_evento', 'fecha_inicio', 'fecha_fin','hora' , 'descripcion', 'publico'];
}
