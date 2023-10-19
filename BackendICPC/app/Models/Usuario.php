<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_usuario','correo_electronico','institucion','telefono','fecha_nacimiento','evento_id'];
}
