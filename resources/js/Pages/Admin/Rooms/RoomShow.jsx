import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

export default function RoomShow({ room }) {
    const { delete: destroy } = useForm();
    const route = useRoute();

    function submit(e) {
        e.preventDefault();
        destroy(route("rooms.destroy", room));
    }

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
    return (
        <>
            <div className="w-full overflow-hidden bg-white border rounded-lg shadow-md h-80 relative min-h-[85svh]">
                {room.room_images && room.room_images.length > 0 && (
                    <div className="relative">
                        {console.log(room)}
                        <img
                            src={`/storage/${room.room_images[currentImageIndex].image_path}`}
                            alt={`Room ${room.room_number}`}
                            className="object-cover w-full h-[50svh]"
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
                    <p className="mb-1 text-sm">
                        Room Number: {room.room_number}
                    </p>
                    <p className="mb-1 text-sm">Capacity: {room.capacity}</p>
                    <p className="mb-1 text-sm">Price: ${room.price}</p>
                    <p className="mb-1 text-sm">
                        Status:{" "}
                        {room.availability_status
                            ? "Available"
                            : "Not Available"}
                    </p>
                    <p className="text-sm">
                        Description: {room.room_description}
                    </p>

                    <div className="flex items-center justify-end gap-2">
                        <form onSubmit={submit}>
                            <button className="bg-red-500 rounded-md text-sm px-4 py-1 text-white">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
