<?php

namespace App\Models;
use App\Models\DetalleRequisito;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequisitosEvento extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_requisito',
        'descripcion_requisito',
        'tipo_requisito',
        'maximo_valor',
        'minimo_valor'
    ];
    public function detalleRequisitos()
    {
        return $this->hasMany(DetalleRequisito::class, 'id_requisito');
    }
}
