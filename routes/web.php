<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home');
Route::resource('/rooms', RoomController::class);

Route::inertia('/register', 'Auth/Register');
Route::post('/register', [AuthController::class, 'register']);
Route::inertia('/login', 'Auth/Login')->name('login');
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth', 'customer'])->group(function () {
    Route::inertia('/profile', [ProfileController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
