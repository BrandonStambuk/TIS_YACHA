<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\EventoDinamico;
use App\Models\Noticia;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['upload_file_not_found'], 400);
        }

        $file = $request->file('image');

        if (!$file->isValid()) {
            return response()->json(['invalid_file_upload'], 400);
        }

        $path = '/uploads/' . $file->getClientOriginalName();
        Storage::disk('public')->put($path, file_get_contents($file));

        return response()->json(['path' => $path], 200);
    }
    public function get($id){
        $evento = EventoDinamico::find($id);
    
        if (!$evento) {
            return response()->json(['evento_not_found'], 400);
        }
    
        $link = $evento->afiche;
    
        // Obtener información sobre el archivo
        $fileInfo = Storage::disk('public')->getMetadata($link);
    
        return response()->json($fileInfo, 200);
    }
    public function getNoticia($id){
    $noticia = Noticia::find($id);

    if (!$noticia) {
        return response()->json(['noticia_not_found'], 400);
    }

    $link = $noticia->imagen;

    // Obtener la ruta completa del archivo
    $path = Storage::disk('public')->getMetadata($link);
    return response()->json($fileInfo, 200);
}
    public function getImage($url){
        $path = storage_path('app/public'.$url);
        if(!File::exists($path)) abort(404);
        $file = File::get($path);
        $type = File::mimeType($path);
    
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
    
        return $response;
    }
}
