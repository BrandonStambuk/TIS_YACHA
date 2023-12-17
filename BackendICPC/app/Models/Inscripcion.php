<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Participante;
use App\Models\EventoDinamico;

class Inscripcion extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_equipo',
        'evento_dinamicos_id',
    ];
    public function participantes(){
        return $this->hasMany(Participante::class);
    }
    public function eventoDinamico(){
        return $this->belongsTo(EventoDinamico::class);
    }
}
