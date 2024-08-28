import { useState } from "react";
import RoomCard from "@/Components/RoomCard";
import Pagination from "../../../Components/Pagination";

export default function RoomList({ rooms, search }) {
    const [searchInput, setSearchInput] = useState(search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route("admin.rooms.index"), { search: searchInput });
    };

    return (
        <>
            <h1 className="text-center text-2xl font-bold mb-4">Rooms List</h1>

            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search rooms..."
                    className="p-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
                >
                    Search
                </button>
            </form>

            <div className="flex flex-wrap gap-4 h-[60svh]">
                {rooms.data.length > 0 ? (
                    rooms.data.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))
                ) : (
                    <p>No rooms found.</p>
                )}
            </div>

            <Pagination links={rooms.links} />
        </>
    );
}
