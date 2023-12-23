<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Inscripcion;
use Illuminate\Notifications\Notifiable;

class Paticipante extends Model
{
    use HasFactory, Notifiable;
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

    public function routeNotificationForMail()
    {
        return $this->correo;
    }
}
