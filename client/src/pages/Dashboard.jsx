import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaExclamationTriangle,
    FaRupeeSign,
    FaChartLine,
    FaMoneyBillWave,
    FaTruckLoading
} from "react-icons/fa";

import { CalendarDays, RefreshCw } from "lucide-react";

import { getDashboard } from "../services/dashboardService";

import StatsCard from "../components/dashboard/StatsCard";
import SalesChart from "../components/dashboard/SalesChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import LowStockTable from "../components/dashboard/LowStockTable";
import RecentBills from "../components/dashboard/RecentBills";


export default function Dashboard(){


const [loading,setLoading]=useState(false);



const [data,setData]=useState({

    totalProducts:0,

    totalCustomers:0,

    totalBills:0,


    totalPurchases:0,

    purchaseAmount:0,


    lowStock:0,


    inventoryValue:0,


    totalSales:0,

    todaySales:0,


    salesChart:[],

    categoryChart:[],

    lowStockProducts:[],

    recentBills:[]

});





const loadDashboard=async()=>{


try{


setLoading(true);



const response=await getDashboard();



console.log(
"Dashboard Response:",
response
);



setData({


totalProducts:
response.totalProducts ?? 0,


totalCustomers:
response.totalCustomers ?? 0,


totalBills:
response.totalBills ?? 0,




// PURCHASE DATA

totalPurchases:
response.totalPurchases ?? 0,


purchaseAmount:
response.purchaseAmount ?? 0,




// STOCK

lowStock:
response.lowStock ?? 0,


inventoryValue:
response.inventoryValue ?? 0,




// SALES

totalSales:
response.totalSales ?? 0,


todaySales:
response.todaySales ?? 0,




// CHARTS

salesChart:
response.salesChart ?? [],


categoryChart:
response.categoryChart ?? [],



lowStockProducts:
response.lowStockProducts ?? [],



recentBills:
response.recentBills ?? []


});



}

catch(error){


console.log(
"Dashboard Error:",
error
);


toast.error(
"Failed to load dashboard"
);


}

finally{

setLoading(false);

}


};





useEffect(()=>{


loadDashboard();


},[]);







return (

<div className="space-y-8">



<div className="
bg-gradient-to-r
from-green-700
to-green-600
rounded-2xl
p-6
md:p-8
text-white
shadow-lg
">


<div className="
flex
justify-between
items-center
flex-wrap
gap-5
">


<div>


<h1 className="
text-2xl
md:text-4xl
font-bold
">

🌾 Welcome, Rushikesh Band 👋

</h1>


<p className="text-green-100 mt-3">

Welcome to 
<strong>
{" "}शेतकरी अॅग्रो
</strong>
{" "}Inventory Management System

</p>


</div>




<div className="
bg-white/20
px-5
py-4
rounded-xl
">


<div className="
flex
items-center
gap-2
">


<CalendarDays size={20}/>


<span>

{
new Date()
.toLocaleDateString(
"en-IN",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
)
}

</span>


</div>


</div>


</div>


</div>






<div className="flex justify-end">


<button

onClick={loadDashboard}

disabled={loading}

className="
flex
items-center
gap-2
bg-green-700
text-white
px-4
py-2
rounded-lg
"


>


<RefreshCw

size={18}

className={
loading
?
"animate-spin"
:
""
}

/>


Refresh


</button>


</div>









<div className="
grid
xl:grid-cols-4
md:grid-cols-2
gap-6
">





<StatsCard

title="Products"

value={data.totalProducts}

icon={<FaBoxOpen/>}

color="green"

/>





<StatsCard

title="Customers"

value={data.totalCustomers}

icon={<FaUsers/>}

color="blue"

/>





<StatsCard

title="Bills"

value={data.totalBills}

icon={<FaShoppingCart/>}

color="purple"

/>





<StatsCard

title="Purchases"

value={data.totalPurchases}

icon={<FaTruckLoading/>}

color="green"

/>





<StatsCard

title="Purchase Amount"

value={
`₹ ${Number(
data.purchaseAmount
).toLocaleString("en-IN")}`
}

icon={<FaTruckLoading/>}

color="yellow"

/>





<StatsCard

title="Low Stock"

value={data.lowStock}

icon={<FaExclamationTriangle/>}

color="red"

/>





<StatsCard

title="Inventory Value"

value={
`₹ ${Number(
data.inventoryValue
).toLocaleString("en-IN")}`
}

icon={<FaRupeeSign/>}

color="yellow"

/>





<StatsCard

title="Today's Sales"

value={
`₹ ${Number(
data.todaySales
).toLocaleString("en-IN")}`
}

icon={<FaChartLine/>}

color="green"

/>





<StatsCard

title="Total Sales"

value={
`₹ ${Number(
data.totalSales
).toLocaleString("en-IN")}`
}

icon={<FaMoneyBillWave/>}

color="blue"

/>



</div>









<div className="
grid
xl:grid-cols-2
gap-6
">


<SalesChart

data={data.salesChart}

/>



<CategoryPieChart

data={data.categoryChart}

/>


</div>








<div className="
grid
xl:grid-cols-2
gap-6
">


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