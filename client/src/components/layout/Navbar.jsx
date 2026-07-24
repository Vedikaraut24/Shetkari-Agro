import { useEffect, useState } from "react";
import { Menu, LogOut, User, Clock } from "lucide-react";

export default function Navbar({ setSidebarOpen }) {

    const [time, setTime] = useState("");

    useEffect(() => {

        const updateTime = () => {

            const now = new Date();

            setTime(

                now.toLocaleString("en-IN", {

                    dateStyle: "medium",

                    timeStyle: "short"

                })

            );

        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    return (

        <header className="bg-white shadow-md border-b border-gray-200 h-20 flex items-center justify-between px-6">

            {/* Left */}

            <div className="flex items-center gap-4">

                <button

                    onClick={() => setSidebarOpen(true)}

                    className="lg:hidden bg-green-700 hover:bg-green-800 text-white p-2 rounded-lg"

                >

                    <Menu size={24} />

                </button>

                <div>

                    <h1 className="text-2xl font-bold text-green-700">

                        🌾 शेतकरी अॅग्रो

                    </h1>

                    <p className="text-sm text-gray-500">

                        Inventory Management System

                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <div className="hidden md:flex items-center gap-2 text-gray-600">

                    <Clock size={18} />

                    <span className="text-sm">

                        {time}

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-green-700 flex items-center justify-center text-white">

                        <User size={20} />

                    </div>

                    <div className="hidden sm:block">

                        <h3 className="font-semibold">

                            रुषिकेश बंड

                        </h3>

                        <p className="text-xs text-gray-500">

                            Administrator

                        </p>

                    </div>

                </div>

                <button

                    onClick={logout}

                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"

                >

                    <LogOut size={18} />

                    <span className="hidden sm:inline">

                        Logout

                    </span>

                </button>

            </div>

        </header>

    );

}