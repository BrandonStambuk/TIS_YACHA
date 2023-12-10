<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = $image->getClientOriginalName();

            // Guarda la imagen en el disco 'public'
            $path = Storage::disk('public')->put($filename, file_get_contents($image));

            return response()->json(['path' => $path], 200);
        } else {
            return response()->json(['error' => 'No image uploaded'], 400);
        }
    }
}