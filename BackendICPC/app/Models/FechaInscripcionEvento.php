<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FechaInscripcionEvento extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha_inicio_inscripcion',
        'fecha_fin_inscripcion'
    ];
}
