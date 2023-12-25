<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Paticipante;
use App\Models\EventoDinamico;

class Inscripcion extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_equipo',
        'problemas_resueltos',
        'penalidad',
        'evento_dinamicos_id',
    ];
    public function paticipante(){
        return $this->hasMany(Paticipante::class, 'inscripcions_id');
    }
    public function eventoDinamico(){
        return $this->belongsTo(EventoDinamico::class, 'evento_dinamicos_id');
    }
}
