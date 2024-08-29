import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import EmailInput from "@/Components/EmailInput";
import NumberInput from "@/Components/NumberInput";
import Button from "@/Components/Button";
import PasswordInput from "@/Components/PasswordInput";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <form onSubmit={submit}>
            <div className="flex justify-center items-center border p-5 rounded-lg w-1/2 min-h-[50svh] mx-auto flex-col">
            <h1 className="text-center text-2xl font-bold mb-4 text-slate-700 cursor-default">Register Account</h1>
                <div>
                    <TextInput
                        id="name"
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                    />

                    <EmailInput
                        id="email"
                        label="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    <PasswordInput
                        id="password"
                        label="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />

                    <PasswordInput
                        id="password_confirmation"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        confirmationValue={data.password}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                    />

                    <NumberInput
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                        error={errors.phone_number}
                        className="no-spinner"
                    />

                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={processing}
                            processing={processing}
                            text="Create Account"
                            className="w-full"
                        />
                    </div>

                    <div className="mt-6">
                        <Link className="text-[13px]" href="/login" >Already have account? <span className="text-blue-500 underline">Login here</span></Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
