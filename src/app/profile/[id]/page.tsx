"use client";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
                Profile
            </h1>
            <p className="text-center text-white text-2xl font-bold mb-4 bg-blue-500 p-4 rounded-lg">
                {params.id}
            </p>
        </div>
    );
}
