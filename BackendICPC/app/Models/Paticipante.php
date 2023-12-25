<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Inscripcion;

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
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'inscripcions_id');
    }
    public function otroRequisito()
    {
        return $this->hasMany(OtroRequisito::class, 'paticipantes_id');
    }

    public function routeNotificationForMail()
    {
        return $this->correo;
    }
}
