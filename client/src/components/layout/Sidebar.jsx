import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Users,
    ShoppingCart,
    Receipt,
    FileText,
    Settings,
    LogOut
} from "lucide-react";

export default function Sidebar() {

    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Products",
            path: "/products",
            icon: Package
        },
        {
            name: "Categories",
            path: "/categories",
            icon: FolderTree
        },
        {
            name: "Customers",
            path: "/customers",
            icon: Users
        },
        {
            name: "Billing",
            path: "/billing",
            icon: ShoppingCart
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: Receipt
        },
        {
            name: "Reports",
            path: "/reports",
            icon: FileText
        },
        {
            name: "Settings",
            path: "/settings",
            icon: Settings
        }
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-green-800 text-white shadow-lg">

            <div className="p-6 border-b border-green-700">

                <h1 className="text-2xl font-bold">
                    🌾 Shetkari Agro
                </h1>

                <p className="text-green-200 text-sm">
                    Inventory System
                </p>

            </div>

            <nav className="mt-5">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-4 transition ${
                                    isActive
                                        ? "bg-green-600"
                                        : "hover:bg-green-700"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    );

                })}

            </nav>

            <button
                className="absolute bottom-6 left-6 flex items-center gap-2 text-red-200 hover:text-white"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>

        </aside>
    );
}