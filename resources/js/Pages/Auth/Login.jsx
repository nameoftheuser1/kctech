import React from "react";
import { Link, useForm } from "@inertiajs/react";
import EmailInput from "@/Components/EmailInput";
import PasswordInput from "@/Components/PasswordInput";
import Button from "@/Components/Button";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <form onSubmit={submit}>
            <div className="flex justify-center items-center border p-5 rounded-lg w-1/2 min-h-[50svh] mx-auto flex-col">
                <h1 className="text-center text-2xl font-bold mb-4 text-slate-700 cursor-default">
                    Login
                </h1>
                <div>
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
                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={processing}
                            processing={processing}
                            text="Log In"
                            className="w-full"
                        />
                    </div>
                    <div className="mt-6">
                        <Link className="text-[13px]" href="/register">
                            Don't have account?{" "}
                            <span className="text-blue-500 underline">
                                Register here
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
