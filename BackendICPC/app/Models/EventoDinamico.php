<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;
use App\Models\DetalleRequisitos;

class EventoDinamico extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_evento_dinamico',
        'tipo_evento_dinamico_id',
        'descripcion_evento_dinamico',
        'lugar_evento_dinamico',
        'cantidad_participantes_evento_dinamico',
    ];

    public function tipoEventoDinamico()
    {
        return $this->belongsTo(TipoEventoDinamico::class, 'tipo_evento_dinamico_id');
    }
    public function fechaInscripcionEvento()
    {
        return $this->hasMany(FechaInscripcionEvento::class, 'evento_dinamicos_id');
    }
    
    public function detalleRequisitos()
    {
        return $this->hasMany(DetalleRequisitos::class, 'id_evento_dinamico');
    }
    
}
