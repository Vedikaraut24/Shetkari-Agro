import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaExclamationTriangle,
  FaRupeeSign,
  FaChartLine,
  FaMoneyBillWave
} from "react-icons/fa";

import { CalendarDays } from "lucide-react";

import { getDashboard } from "../services/dashboardService";

import StatsCard from "../components/dashboard/StatsCard";
import SalesChart from "../components/dashboard/SalesChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import LowStockTable from "../components/dashboard/LowStockTable";
import RecentBills from "../components/dashboard/RecentBills";

export default function Dashboard() {

    const [data, setData] = useState({

        totalProducts: 0,
        totalCustomers: 0,
        totalBills: 0,
        lowStock: 0,

        inventoryValue: 0,
        totalSales: 0,
        todaySales: 0,

        salesChart: [],
        categoryChart: [],
        lowStockProducts: [],
        recentBills: []

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const dashboard = await getDashboard();

            setData({

                totalProducts: dashboard.totalProducts || 0,
                totalCustomers: dashboard.totalCustomers || 0,
                totalBills: dashboard.totalBills || 0,
                lowStock: dashboard.lowStock || 0,

                inventoryValue: dashboard.inventoryValue || 0,
                totalSales: dashboard.totalSales || 0,
                todaySales: dashboard.todaySales || 0,

                salesChart: dashboard.salesChart || [],
                categoryChart: dashboard.categoryChart || [],
                lowStockProducts: dashboard.lowStockProducts || [],
                recentBills: dashboard.recentBills || []

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to load dashboard");

        }

    };

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 shadow-lg text-white">

                <div className="flex justify-between items-center flex-wrap gap-6">

                    <div>

                        <h1 className="text-4xl font-bold">

                            🌾 Welcome, Rushikesh Band 👋

                        </h1>

                        <p className="text-green-100 mt-3 text-lg">

                            Welcome to <strong>शेतकरी अॅग्रो</strong> Inventory Management Dashboard

                        </p>

                    </div>

                    <div className="bg-white/20 px-5 py-4 rounded-xl">

                        <div className="flex items-center gap-2">

                            <CalendarDays size={20} />

                            <span>

                                {new Date().toLocaleDateString("en-IN", {

                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"

                                })}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

                <StatsCard

                    title="Products"

                    value={data.totalProducts}

                    icon={<FaBoxOpen />}

                    color="green"

                />

                <StatsCard

                    title="Customers"

                    value={data.totalCustomers}

                    icon={<FaUsers />}

                    color="blue"

                />

                <StatsCard

                    title="Bills"

                    value={data.totalBills}

                    icon={<FaShoppingCart />}

                    color="purple"

                />

                <StatsCard

                    title="Low Stock"

                    value={data.lowStock}

                    icon={<FaExclamationTriangle />}

                    color="red"

                />

                <StatsCard

                    title="Inventory Value"

                    value={`₹ ${Number(data.inventoryValue).toLocaleString()}`}

                    icon={<FaRupeeSign />}

                    color="yellow"

                />

                <StatsCard

                    title="Today's Sales"

                    value={`₹ ${Number(data.todaySales).toLocaleString()}`}

                    icon={<FaChartLine />}

                    color="green"

                />

                <StatsCard

                    title="Total Sales"

                    value={`₹ ${Number(data.totalSales).toLocaleString()}`}

                    icon={<FaMoneyBillWave />}

                    color="blue"

                />

            </div>

            {/* Charts */}

            <div className="grid xl:grid-cols-2 gap-6">

                <SalesChart

                    data={data.salesChart}

                />

                <CategoryPieChart

                    data={data.categoryChart}

                />

            </div>

            {/* Tables */}

            <div className="grid xl:grid-cols-2 gap-6">

                <LowStockTable

                    products={data.lowStockProducts}

                />

                <RecentBills

                    bills={data.recentBills}

                />

            </div>

        </div>

    );

}