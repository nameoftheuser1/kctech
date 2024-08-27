<?php

use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home');
Route::resource('/rooms', RoomController::class);
