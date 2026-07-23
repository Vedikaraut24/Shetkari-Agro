import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function AdminLayout() {

    return (

        <div className="flex min-h-screen bg-gray-100">


            {/* Sidebar */}

            <Sidebar />



            {/* Main Content */}

            <div className="flex-1 ml-64">


                {/* Navbar */}

                <Navbar />



                {/* Page Content */}

                <main className="p-6">

                    <Outlet />

                </main>


            </div>


        </div>

    );

}