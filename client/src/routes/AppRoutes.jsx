import { Routes, Route } from "react-router-dom";


// Pages

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Billing from "../pages/Billing";
import Purchase from "../pages/Purchase";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";

import NotFound from "../pages/NotFound";


// Layout

import AdminLayout from "../components/layout/AdminLayout";



export default function AppRoutes(){


return (

<Routes>



{/* LOGIN */}

<Route

path="/"

element={<Login/>}

/>





{/* ADMIN PANEL */}

<Route element={<AdminLayout/>}>


<Route

path="/dashboard"

element={<Dashboard/>}

/>



<Route

path="/products"

element={<Products/>}

/>



<Route

path="/categories"

element={<Categories/>}

/>



<Route

path="/customers"

element={<Customers/>}

/>



<Route

path="/billing"

element={<Billing/>}

/>



<Route

path="/purchase"

element={<Purchase/>}

/>



<Route

path="/transactions"

element={<Transactions/>}

/>



<Route

path="/settings"

element={<Settings/>}

/>



</Route>





{/* 404 */}

<Route

path="*"

element={<NotFound/>}

/>



</Routes>


);


}