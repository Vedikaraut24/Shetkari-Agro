import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Billing from "../pages/Billing";
import Reports from "../pages/Reports";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";

import NotFound from "../pages/NotFound";

import AdminLayout from "../components/layout/AdminLayout";

export default function AppRoutes() {

    return (

        <Routes>

            {/* Login */}

            <Route
                path="/"
                element={<Login />}
            />



            {/* Admin Layout */}

            <Route element={<AdminLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/categories"
                    element={<Categories />}
                />

                <Route
                    path="/customers"
                    element={<Customers />}
                />

                <Route
                    path="/billing"
                    element={<Billing />}
                />

                <Route
                    path="/transactions"
                    element={<Transactions />}
                />

                <Route
                    path="/reports"
                    element={<Reports />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>



            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}