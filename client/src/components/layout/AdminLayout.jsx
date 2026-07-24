import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}

            <Sidebar

                isOpen={sidebarOpen}

                setIsOpen={setSidebarOpen}

            />

            {/* Overlay */}

            {

                sidebarOpen && (

                    <div

                        onClick={() => setSidebarOpen(false)}

                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"

                    />

                )

            }

            {/* Main */}

            <div className="lg:ml-64">

                <Navbar

                    setSidebarOpen={setSidebarOpen}

                />

                <main className="p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}