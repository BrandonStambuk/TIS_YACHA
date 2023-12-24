<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventoDinamico;
use App\Models\EtapaEvento;


class FechaInscripcionEvento extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha_inicio_inscripcion',
        'fecha_fin_inscripcion',
        'evento_dinamicos_id'
    ];
    public function eventoDinamico(){
        return $this->belongsTo(EventoDinamico::class, 'evento_dinamicos_id');
    }
    public function etapaEvento(){
        return $this->hasMany(EtapaEvento::class, 'etapa_fecha_inscripcion_eventos_id');
    }
    
}
