<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone_number' => ['nullable', 'string'],
        ]);

        $user = User::create($fields);

        return inertia('Customer/ProfileHome');
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => ['required', 'max:255'],
            'password' => ['required'],
        ];

        if ($request->email !== 'admin') {
            $rules['email'][] = 'email';
        }

        $fields = $request->validate($rules);

        if (Auth::attempt($fields, $request->remember)) {
            return redirect()->intended('/');
        } else {
            return Inertia::render('Auth/Login', [
                'errors' => [
                    'failed' => 'The provided credentials do not match our records.'
                ]
            ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return inertia('/login');
    }
}
