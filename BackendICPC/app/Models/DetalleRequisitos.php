<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleRequisitos extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_evento_dinamico',
        'id_requisito',
    ];
    public function eventoDinamico()
    {
        return $this->belongsTo(EventoDinamico::class, 'id_evento_dinamico');
    }
    public function requisitosEvento()
    {
        return $this->belongsTo(RequisitosEvento::class, 'id_requisito');
    }
}
