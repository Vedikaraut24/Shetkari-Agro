import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 ml-64">

                <Navbar />

                <main className="p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}