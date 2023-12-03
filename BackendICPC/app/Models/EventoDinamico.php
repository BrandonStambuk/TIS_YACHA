<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;

class EventoDinamico extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_evento_dinamico',
        'tipo_evento_dinamico_id',
        'fecha_inscripcion_eventos_id',
        'descripcion_evento_dinamico',
        'lugar_evento_dinamico',
        'cantidad_participantes_evento_dinamico',
    ];

    public function tipoEventoDinamico()
    {
        return $this->belongsTo(TipoEventoDinamico::class, 'tipo_evento_dinamico_id');
    }

    public function fechaInscripcionEventos()
    {
        return $this->belongsTo(FechaInscripcionEvento::class, 'fecha_inscripcion_eventos_id');
    }
}
