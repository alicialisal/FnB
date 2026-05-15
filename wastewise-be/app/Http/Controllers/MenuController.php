<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Return a single menu's details by its KodeMenu.
     */
    public function show($kodeMenu)
    {
        $menu = Menu::with('resto:KodeResto,Nama,Alamat,JamTutup')
            ->where('KodeMenu', $kodeMenu)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Menu retrieved successfully.',
            'data'    => $menu
        ]);
    }

    /**
     * Tambah menu baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'KodeMenu'  => 'required|string|unique:mmenu,KodeMenu',
            'NamaMenu'  => 'required|string|max:255',
            'Stok'      => 'required|integer|min:0',
            'HargaMenu' => 'required|integer|min:0',
            'KodeResto' => 'required|string|exists:mresto,KodeResto',
            'Tipe'      => 'required|string|max:50',
            'Random'    => 'boolean',
            'Deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $menu = Menu::create($request->only([
            'KodeMenu', 'NamaMenu', 'Stok', 'HargaMenu',
            'KodeResto', 'Tipe', 'Random', 'Deskripsi',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil ditambahkan.',
            'data'    => $menu
        ], 201);
    }

    /**
     * Edit / update menu berdasarkan KodeMenu.
     */
    public function update(Request $request, $kodeMenu)
    {
        $menu = Menu::where('KodeMenu', $kodeMenu)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'NamaMenu'  => 'sometimes|string|max:255',
            'Stok'      => 'sometimes|integer|min:0',
            'HargaMenu' => 'sometimes|integer|min:0',
            'KodeResto' => 'sometimes|string|exists:mresto,KodeResto',
            'Tipe'      => 'sometimes|string|max:50',
            'Random'    => 'sometimes|boolean',
            'Deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $menu->update($request->only([
            'NamaMenu', 'Stok', 'HargaMenu',
            'KodeResto', 'Tipe', 'Random', 'Deskripsi',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil diupdate.',
            'data'    => $menu->fresh()
        ]);
    }

    /**
     * Hapus menu berdasarkan KodeMenu.
     */
    public function destroy($kodeMenu)
    {
        $menu = Menu::where('KodeMenu', $kodeMenu)->firstOrFail();
        $menu->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil dihapus.',
        ]);
    }
}

