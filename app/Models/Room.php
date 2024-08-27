<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_type',
        'room_number',
        'capacity',
        'price',
        'availability_status',
        'room_description',
    ];

    public function roomImages(): HasMany
    {
        return $this->hasMany(RoomImage::class);
    }
}
