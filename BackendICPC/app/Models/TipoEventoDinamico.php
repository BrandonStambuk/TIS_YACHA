<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEventoDinamico extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_tipo_evento_dinamico',
    ];
}