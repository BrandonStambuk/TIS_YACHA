<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventoDinamico;

class TipoEventoDinamico extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_tipo_evento_dinamico',
        'tieneNota'
    ];
    public function eventoDinamico()
    {
        return $this->hasMany(EventoDinamico::class, 'tipo_evento_dinamico_id');
    }
}