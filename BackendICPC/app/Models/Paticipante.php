<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Inscripcion;

class Paticipante extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        //'correo_institucional',
        'telefono_celular',
        /*'institucion',
        'codigo_sis',
        'carrera',*/
        'fecha_nacimiento',
        'inscripcions_id',
    ];
    public function inscripcion(){
        return $this->belongsTo(Inscripcion::class);
    }
}
