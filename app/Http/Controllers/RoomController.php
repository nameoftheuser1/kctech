<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $rooms = Room::query()
            ->with('roomImages')
            ->when($search, function ($query, $search) {
                $query->where('room_type', 'like', "%{$search}%")
                    ->orWhere('room_number', 'like', "%{$search}%")
                    ->orWhere('capacity', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(9);

        return inertia('Admin/Rooms/RoomList', [
            'rooms' => $rooms,
            'search' => $search
        ]);
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
                } catch (\Exception $e) {
                    Log::error('Error storing image: ' . $e->getMessage());
                }
            }
        } else {
            Log::info('No images found in request');
        }

        return redirect('/rooms')->with('success', 'Successfully added the room.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $room->load('roomImages');
        return inertia('Admin/Rooms/RoomShow', ['room' => $room]);
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
        try {
            DB::beginTransaction();

            $roomImages = $room->roomImages()->get();

            foreach ($roomImages as $image) {
                try {
                    if (Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                    $image->delete();
                } catch (\Exception $e) {
                    Log::error("Failed to delete image {$image->id}: " . $e->getMessage());
                }
            }

            $room->delete();

            DB::commit();
            return redirect('/rooms')->with('deleted', 'The room and its images have been deleted.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to delete room {$room->id}: " . $e->getMessage());
            return redirect('/rooms')->with('error', 'Failed to delete the room. Please try again.');
        }
    }
}
