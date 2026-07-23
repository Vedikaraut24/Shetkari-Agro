import React from "react";

export default function Navbar() {
    return (
        <header className="h-20 bg-white shadow flex items-center justify-between px-8">

            <div>
                <h1 className="text-2xl font-bold text-green-700">
                    🌾 Shetkari Agro
                </h1>

                <p className="text-sm text-gray-500">
                    Inventory Management System
                </p>
            </div>

            <div className="flex items-center gap-4">

                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-lg px-4 py-2 w-72 outline-none"
                />

                <div className="text-right">

                    <h2 className="font-semibold">
                        Admin
                    </h2>

                    <p className="text-sm text-gray-500">
                        Welcome
                    </p>

                </div>

            </div>

        </header>
    );
}