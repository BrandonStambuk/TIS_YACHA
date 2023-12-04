<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class estudiante extends Model
{
    use HasFactory;
    protected $fillable = [
        'codSIS',
        'nombre',
        'apellido',
    ];
}
