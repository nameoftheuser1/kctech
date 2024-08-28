<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home');
Route::resource('/rooms', RoomController::class);

Route::inertia('/register', 'Auth/Register');
Route::post('/register', [AuthController::class, 'register']);
