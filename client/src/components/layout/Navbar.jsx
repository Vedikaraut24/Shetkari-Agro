import {

    FaBell,
    FaSearch,
    FaUserCircle

} from "react-icons/fa";

export default function Navbar() {

    return (

        <header className="h-20 bg-white shadow flex items-center justify-between px-8">

            <div className="flex items-center gap-3">

                <FaSearch className="text-gray-500" />

                <input

                    type="text"

                    placeholder="Search..."

                    className="border rounded-lg px-4 py-2 w-80 outline-none"

                />

            </div>

            <div className="flex items-center gap-6">

                <div className="relative">

                    <FaBell size={22} />

                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">

                        3

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <FaUserCircle

                        size={38}

                        className="text-green-700"

                    />

                    <div>

                        <h2 className="font-semibold">

                            Admin

                        </h2>

                        <p className="text-gray-500 text-sm">

                            Shetkari Agro

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}