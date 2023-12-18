<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RequisitoEvento;
use App\Models\Paticipante;

class OtroRequisito extends Model
{
    use HasFactory;
    protected $fillable = [
        'valor',
        'requisitos_eventos_id',
        'paticipantes_id',
    ];
    public function requisitoEvento(){
        return $this->belongsTo(RequisitoEvento::class);
    }
    public function participante(){
        return $this->belongsTo(Paticipante::class);
    }
}
