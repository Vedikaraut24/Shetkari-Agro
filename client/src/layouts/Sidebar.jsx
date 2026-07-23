import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: "bi-speedometer2", path: "/dashboard" },
  { name: "Products", icon: "bi-box-seam", path: "/products" },
  { name: "Categories", icon: "bi-grid", path: "/categories" },
  { name: "Billing", icon: "bi-receipt", path: "/billing" },
  { name: "Customers", icon: "bi-people", path: "/customers" },
  { name: "Transactions", icon: "bi-arrow-left-right", path: "/transactions" },
  { name: "Reports", icon: "bi-bar-chart", path: "/reports" },
  { name: "Settings", icon: "bi-gear", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen shadow-xl">
      <div className="p-6 border-b border-green-700">
        <h1 className="text-2xl font-bold">🌾 शेतकरी अॅग्रो</h1>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-green-700"
              }`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}