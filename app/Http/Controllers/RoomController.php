<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Rooms/RoomList');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Rooms/RoomCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $fields = $request->validate([
            'room_type' => ['required', 'string', 'max:50'],
            'room_number' => ['required', 'string', 'max:10', 'unique:rooms,room_number'],
            'capacity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0'],
            'availability_status' => ['required', 'in:available,unavailable'],
            'room_description' => ['nullable', 'string', 'max:255'],
            'images' => 'nullable|array',
            'images.*' => ['nullable', 'image', 'max:2048'],
        ]);

        $room = Room::create($fields);


        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {
                    $path = $image->store('room_images', 'public');
                    $roomImage = RoomImage::create([
                        'room_id' => $room->id,
                        'image_path' => $path,
                    ]);
                    Log::info('Created RoomImage:', $roomImage->toArray());
                } catch (\Exception $e) {
                    Log::error('Error storing image: ' . $e->getMessage());
                }
            }
        } else {
            Log::info('No images found in request');
        }

        return back()->with('success', 'Successfully added the room with images.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
