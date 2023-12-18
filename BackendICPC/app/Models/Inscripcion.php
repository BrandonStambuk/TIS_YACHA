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
        'evento_dinamicos_id',
    ];
    public function participantes(){
        return $this->hasMany(Paticipante::class);
    }
    public function eventoDinamico(){
        return $this->belongsTo(EventoDinamico::class);
    }
}
