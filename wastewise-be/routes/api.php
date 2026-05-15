<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\RestoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ── Public routes (no token required) ────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ── Protected routes (Bearer token required) ─────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Restaurants
    Route::get('/resto',        [RestoController::class, 'index']);   // all restos
    Route::get('/resto/{kode}', [RestoController::class, 'show']);    // single resto + menu

    // Menu
    Route::get('/menu/{kodeMenu}',    [MenuController::class, 'show']);    // detail menu
    Route::post('/menu',              [MenuController::class, 'store']);   // tambah menu
    Route::put('/menu/{kodeMenu}',    [MenuController::class, 'update']);  // edit menu
    Route::delete('/menu/{kodeMenu}', [MenuController::class, 'destroy']); // hapus menu

    // Orders  (pelanggan only)
    Route::get('/pesanan',            [PesananController::class, 'index']);  // my orders
    Route::post('/pesanan',           [PesananController::class, 'store']);  // place order
    Route::get('/pesanan/{noPesanan}',[PesananController::class, 'show']);   // single order
});
