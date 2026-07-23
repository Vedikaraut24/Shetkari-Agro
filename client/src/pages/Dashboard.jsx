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

        ...dashboard,

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

    <div>

      <h1 className="text-3xl font-bold text-green-700 mb-2">

        📊 Dashboard

      </h1>

      <p className="text-gray-500 mb-8">

        Welcome to Shetkari Agro Inventory Management System

      </p>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

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
          value={`₹ ${data.inventoryValue}`}
          icon={<FaRupeeSign />}
          color="yellow"
        />

        <StatsCard
          title="Today's Sales"
          value={`₹ ${data.todaySales}`}
          icon={<FaChartLine />}
          color="green"
        />

        <StatsCard
          title="Total Sales"
          value={`₹ ${data.totalSales}`}
          icon={<FaMoneyBillWave />}
          color="blue"
        />

      </div>

      <div className="grid xl:grid-cols-2 gap-6 mb-8">

        <SalesChart
          data={data.salesChart}
        />

        <CategoryPieChart
          data={data.categoryChart}
        />

      </div>

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