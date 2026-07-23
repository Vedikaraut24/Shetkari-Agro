import { NavLink } from "react-router-dom";

import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaUsers,
    FaShoppingCart,
    FaExchangeAlt,
    FaChartBar,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {

    const menu = [

        {
            name: "Dashboard",
            icon: FaTachometerAlt,
            path: "/dashboard"
        },

        {
            name: "Products",
            icon: FaBoxOpen,
            path: "/products"
        },

        {
            name: "Categories",
            icon: FaTags,
            path: "/categories"
        },

        {
            name: "Customers",
            icon: FaUsers,
            path: "/customers"
        },

        {
            name: "Billing",
            icon: FaShoppingCart,
            path: "/billing"
        },

        {
            name: "Transactions",
            icon: FaExchangeAlt,
            path: "/transactions"
        },

        {
            name: "Reports",
            icon: FaChartBar,
            path: "/reports"
        },

        {
            name: "Settings",
            icon: FaCog,
            path: "/settings"
        }

    ];

    return (

        <aside className="fixed left-0 top-0 w-64 h-screen bg-green-800 text-white shadow-xl">

            <div className="p-6 border-b border-green-700">

                <h1 className="text-2xl font-bold">

                    🌾 Shetkari Agro

                </h1>

                <p className="text-green-200 text-sm">

                    Inventory System

                </p>

            </div>

            <nav className="mt-5">

                {

                    menu.map(item => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.name}

                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-4 px-6 py-4 transition-all

                                    ${

                                        isActive

                                            ? "bg-green-600"

                                            : "hover:bg-green-700"

                                    }`

                                }

                            >

                                <Icon size={20} />

                                <span>

                                    {item.name}

                                </span>

                            </NavLink>

                        );

                    })

                }

            </nav>

            <button

                className="absolute bottom-6 left-6 flex items-center gap-3"

            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}