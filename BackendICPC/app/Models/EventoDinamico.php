<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TipoEventoDinamico;
use App\Models\TipoCompetenciaDinamico;
use App\Models\FechaInscripcionEvento;
use App\Models\DetalleRequisitos;
use App\Models\Inscripcion;

class EventoDinamico extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_evento_dinamico',
        'tipo_evento_dinamico_id',
        'tipo_competencia_dinamica_id',
        'tipo_modalidad',
        'descripcion_evento_dinamico',
        'lugar_evento_dinamico',
        'cantidad_participantes_evento_dinamico',
        'mostrar_publico',
        'afiche'
    ];

    public function tipoEventoDinamico()
    {
        return $this->belongsTo(TipoEventoDinamico::class, 'tipo_evento_dinamico_id');
    }
    public function tipoCompetenciaDinamico()
    {
        return $this->belongsTo(TipoCompetenciaDinamico::class, 'tipo_competencia_dinamica_id');
    }
    public function fechaInscripcionEvento()
    {
        return $this->hasMany(FechaInscripcionEvento::class, 'evento_dinamicos_id');
    }
    
    public function detalleRequisitos()
    {
        return $this->hasMany(DetalleRequisitos::class, 'id_evento_dinamico');
    }
    public function inscripcion()
    {
        return $this->hasMany(Inscripcion::class, 'evento_dinamicos_id');
    }
    
}
