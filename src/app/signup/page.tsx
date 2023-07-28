"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [buttonConfig, setButtonConfig] = React.useState({
        text: "Login",
        disabled: false,
        loading: false,
    });

    const onSignup = async (e: any) => {
        try {
            setButtonConfig({ ...buttonConfig, loading: true, disabled: true });
            const { data } = await axios.post("/api/users/signup", user);
            console.log("Signup Success", data);
            e.preventDefault();
            router.push("/signup");
        } catch (error: any) {
            console.log("Signup Failed", error.message);
        } finally {
            setButtonConfig({
                text: "Signup",
                disabled: false,
                loading: false,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-black text-2xl font-bold mb-4">
                    Signup
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        placeholder="Username"
                        className="border border-gray-300 p-2 rounded-lg text-black"
                    />
                    <input
                        type="email"
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
                    <input
                        type="password"
                        value={user.confirmPassword}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                confirmPassword: e.target.value,
                            })
                        }
                        placeholder="Confirm Password"
                        className="border border-gray-300 p-2 rounded-lg text-black"
                    />
                    <button
                        onClick={onSignup}
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Signup
                    </button>
                    <Link className="text-center text-black" href="/login">
                        Visit Login Page
                    </Link>
                </form>
            </div>
        </div>
    );
}
