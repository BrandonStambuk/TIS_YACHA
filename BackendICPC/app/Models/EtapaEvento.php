<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FechaInscripcionEvento;

class EtapaEvento extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha_inicio_etapa',
        'fecha_fin_etapa',
        'hora_inicio_etapa',
        'hora_fin_etapa',
        'contenido_etapa',
        'etapa_fecha_inscripcion_eventos_id'
    ];
    public function fechaInscripcionEvento(){
        return $this->belongsTo(FechaInscripcionEvento::class, 'etapa_fecha_inscripcion_eventos_id');
    }
}
