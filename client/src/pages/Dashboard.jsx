import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Total Products"
          value="120"
          icon="📦"
          color="#2E7D32"
        />

        <StatCard
          title="Total Stock"
          value="3500"
          icon="📈"
          color="#1976D2"
        />

        <StatCard
          title="Today's Sales"
          value="₹18,750"
          icon="💰"
          color="#FBC02D"
        />

        <StatCard
          title="Low Stock"
          value="15"
          icon="⚠️"
          color="#D32F2F"
        />

        <StatCard
          title="Bills"
          value="42"
          icon="🧾"
          color="#8E24AA"
        />

        <StatCard
          title="Customers"
          value="185"
          icon="👥"
          color="#00897B"
        />

      </div>
    </MainLayout>
  );
}