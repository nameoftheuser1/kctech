import { useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import Button from '@/Components/Button';

export default function RoomCreate() {
    const { data, setData, post, errors, processing, progress } = useForm({
        room_type: "",
        room_number: "",
        capacity: "",
        price: "",
        availability_status: "",
        room_description: "",
        files: []
    });

    const handleFilesChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 5);
        setData("images", selectedFiles);
    };

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("room_type", data.room_type);
        formData.append("room_number", data.room_number);
        formData.append("capacity", data.capacity);
        formData.append("price", data.price);
        formData.append("availability_status", data.availability_status);
        formData.append("room_description", data.room_description);

        data.images.forEach((file, index) => {
            formData.append(`images[]`, file);
        });

        post('/rooms', formData);
    }

    const availabilityOptions = [
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' }
    ];

    return (
        <>
            <h1 className="mb-6 text-2xl font-bold">Create Room</h1>
            <div className="flex justify-center">
                <form onSubmit={submit} className="w-full max-w-lg space-y-4" encType="multipart/form-data">
                    <TextInput
                        id="room_type"
                        label="Room Type"
                        value={data.room_type}
                        onChange={(e) => setData("room_type", e.target.value)}
                        error={errors.room_type}
                    />

                    <TextInput
                        id="room_number"
                        label="Room Number"
                        value={data.room_number}
                        onChange={(e) => setData("room_number", e.target.value)}
                        error={errors.room_number}
                    />

                    <NumberInput
                        id="capacity"
                        label="Capacity"
                        value={data.capacity}
                        onChange={(e) => setData("capacity", e.target.value)}
                        error={errors.capacity}
                    />

                    <NumberInput
                        id="price"
                        label="Price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        error={errors.price}
                    />

                    <SelectInput
                        id="availability_status"
                        label="Availability Status"
                        value={data.availability_status}
                        onChange={(e) => setData("availability_status", e.target.value)}
                        error={errors.availability_status}
                        options={availabilityOptions}
                    />

                    <TextArea
                        id="room_description"
                        label="Room Description"
                        value={data.room_description}
                        onChange={(e) => setData("room_description", e.target.value)}
                        error={errors.room_description}
                    />

                    <div>
                        <label htmlFor="room_images" className="block font-medium text-gray-700">Room Images</label>
                        <input
                            type="file"
                            id="room_images"
                            name="images[]"
                            multiple
                            accept="image/*"
                            onChange={handleFilesChange}
                            className="block w-full mt-1"
                        />
                        {errors.files && <span className="text-red-600">{errors.files}</span>}
                    </div>

                    {progress && (
                        <div className="w-full bg-gray-200 rounded h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded" style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                    )}

                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={processing}
                            processing={processing}
                            text="Add Room"
                            className="w-full"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
