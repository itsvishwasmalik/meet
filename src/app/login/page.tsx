"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonConfig, setButtonConfig] = React.useState({
        text: "Login",
        disabled: false,
        loading: false,
    });

    const onLogin = async () => {
        try {
            setButtonConfig({ ...buttonConfig, loading: true, disabled: true });
            const response = await axios.post("/api/users/login", user);
            console.log(response, "response");
            router.push("/");
        } catch (error: any) {
            console.log(error);
        } finally {
            setButtonConfig({
                text: "Login",
                disabled: false,
                loading: false,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-black text-2xl font-bold mb-4">
                    Login
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        placeholder="Email"
                        className="border border-gray-300 p-2 rounded-lg text-black"
                    />
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="Password"
                        className="border border-gray-300 p-2 rounded-lg text-black"
                    />
                    <button
                        onClick={onLogin}
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Login
                    </button>
                    <Link className="text-center text-black" href="/signup">
                        Visit Signup Page
                    </Link>
                </form>
            </div>
        </div>
    );
}
