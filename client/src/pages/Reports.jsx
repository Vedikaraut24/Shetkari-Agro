import {useEffect,useState} from "react";

import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer

} from "recharts";


import {getReports} from "../services/reportService";



export default function Reports(){



const [data,setData]=useState(null);



useEffect(()=>{

loadData();

},[]);




const loadData=async()=>{


const result = await getReports();

setData(result);


};





if(!data)

return <h2>Loading...</h2>;




return(


<div className="space-y-8">



<h1 className="text-3xl font-bold text-green-700">

Reports Dashboard

</h1>





<div className="grid md:grid-cols-4 gap-5">



<Card

title="Sales"

value={`₹${data.totalSales}`}

/>



<Card

title="Bills"

value={data.totalBills}

/>



<Card

title="Products"

value={data.totalProducts}

/>



<Card

title="Customers"

value={data.totalCustomers}

/>



</div>







<div className="bg-white p-6 rounded-xl shadow">


<h2 className="text-xl font-bold mb-5">

Monthly Sales

</h2>




<ResponsiveContainer width="100%" height={300}>


<BarChart data={data.monthlySales}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis

dataKey="_id.month"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="sales"

/>


</BarChart>


</ResponsiveContainer>



</div>








<div className="bg-white p-6 rounded-xl shadow">


<h2 className="text-xl font-bold mb-5">

Top Selling Products

</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={data.topProducts}>


<XAxis

dataKey="_id"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="quantity"

/>


</BarChart>



</ResponsiveContainer>


</div>






<div className="bg-white p-6 rounded-xl shadow">


<h2 className="text-xl text-red-600 font-bold">

Low Stock Alert

</h2>



{

data.lowStock.map(product=>(


<p

key={product._id}

className="border-b p-3"

>


{product.productName}

:

{product.currentStock}


</p>


))

}



</div>






</div>


);



}






function Card({title,value}){


return(

<div className="bg-white shadow rounded-xl p-5">


<h3 className="text-gray-500">

{title}

</h3>



<p className="text-3xl font-bold text-green-700">

{value}

</p>


</div>

);


}