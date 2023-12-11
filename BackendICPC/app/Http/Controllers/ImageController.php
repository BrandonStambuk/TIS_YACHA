<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
}
