<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventoDinamico;
use App\Models\TipoEventoDinamico;
use App\Models\FechaInscripcionEvento;
use App\Models\Inscripcion;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller{
    public function filter(Request $request){
        $gestion=$request->gestion;
        $tipo=$request->tipo;
        $estado=$request->estado;
        $participantes=$request->participantes;
    
        $resultados=EventoDinamico::query();
    
        if (isset($gestion)) {
            $resultados=$resultados->whereHas('fechaInscripcionEvento', function ($query) use ($gestion) {
                $query->whereYear('fecha_fin_inscripcion', $gestion);
            });
        }
        if(isset($tipo)){
            $resultados=$resultados->where('tipo_evento_dinamico_id',$tipo);
        }
        if(isset($estado)){
            $resultados=$resultados->where('mostrar_publico',$estado);
        }
        if(isset($participantes)){
            $resultados=$resultados->where('cantidad_participantes_evento_dinamico', '=',(int)$participantes);
        }
        $resultados=$resultados->with(['tipoEventoDinamico', 'fechaInscripcionEvento.etapaEvento', 'detalleRequisitos.requisitosEvento'])->get();
        return $resultados;
    }
}