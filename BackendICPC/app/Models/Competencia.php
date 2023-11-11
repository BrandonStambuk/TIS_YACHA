<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_competencia', 'tipo_competencia', 'fecha_inicio_competencia', 'fecha_fin_competencia','fecha_competencia','horas_competencia' ,
     'descripcion_competencia', 'publicado_competencia', 'integrantes_competencia'];
}