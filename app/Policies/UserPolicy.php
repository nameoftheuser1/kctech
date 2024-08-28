<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function view(User $user, User $profile)
    {
        // Check if the logged-in user is the same as the profile user
        return $user->id === $profile->id;
    }

    public function update(User $user, User $profile)
    {
        // Check if the logged-in user is the same as the profile user
        return $user->id === $profile->id;
    }

    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
}
