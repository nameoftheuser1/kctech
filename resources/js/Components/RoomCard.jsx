import React from "react";

const RoomCard = ({ room }) => {
    return (
        <div
            key={room.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border w-1/4 h-80"
        >
            {room.roomImages && room.roomImages.length > 0 && (
                <img
                    src={room.roomImages[0].image_path}
                    alt={`Room ${room.room_number}`}
                    className="w-full h-32 object-cover"
                    onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
                />
            )
            }
            {console.log(room.roomImages)}
            <div className="p-4">
                <h2 className="font-bold text-lg mb-2">
                    Room Type: {room.room_type}
                </h2>
                <p className="text-sm mb-1">Room Number: {room.room_number}</p>
                <p className="text-sm mb-1">Capacity: {room.capacity}</p>
                <p className="text-sm mb-1">Price: ${room.price}</p>
                <p className="text-sm mb-1">
                    Status:{" "}
                    {room.availability_status ? "Available" : "Not Available"}
                </p>
                <p className="text-sm">Description: {room.room_description}</p>
            </div>
        </div>
    );
};

export default RoomCard;
