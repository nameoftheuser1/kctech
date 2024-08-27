import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const RoomCard = ({ room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? room.room_images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === room.room_images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const route = useRoute();
    return (
        <div
            key={room.id}
            className="w-1/4 overflow-hidden bg-white border rounded-lg shadow-md h-80 relative"
        >
            {room.room_images && room.room_images.length > 0 && (
                <div className="relative">
                    <img
                        src={`/storage/${room.room_images[currentImageIndex].image_path}`}
                        alt={`Room ${room.room_number}`}
                        className="object-cover w-full h-32"
                    />
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
                    >
                        &#9664;
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
                    >
                        &#9654;
                    </button>
                </div>
            )}
            <div className="p-4">
                <h2 className="mb-2 text-lg font-bold">
                    Room Type: {room.room_type}
                </h2>
                <p className="mb-1 text-sm">Room Number: {room.room_number}</p>
                <p className="mb-1 text-sm">Capacity: {room.capacity}</p>
                <p className="mb-1 text-sm">Price: ${room.price}</p>
                <p className="mb-1 text-sm">
                    Status:{" "}
                    {room.availability_status ? "Available" : "Not Available"}
                </p>
                <p className="text-sm">Description: {room.room_description}</p>
                <Link
                    href={route("rooms.show", room)}
                    className="mb-3 text-sm text-blue-500"
                >
                    {" "}
                    View room
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;
