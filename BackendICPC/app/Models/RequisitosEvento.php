<?php

namespace App\Models;
use App\Models\DetalleRequisito;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DetalleRequisitos;


class RequisitosEvento extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_requisito',
        'descripcion_requisito',
        'tipo_requisito',
        'valor_minimo',
        'valor_maximo'
    ];
    public function detalleRequisitos()
    {
        return $this->hasMany(DetalleRequisitos::class, 'id_requisito');
    }

}
