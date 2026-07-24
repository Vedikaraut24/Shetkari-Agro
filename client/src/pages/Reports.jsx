import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReports } from "../services/reportService";

import {
  Package,
  Users,
  Receipt,
  IndianRupee,
  Warehouse
} from "lucide-react";


export default function Reports() {


  const [report,setReport] = useState({

    totalProducts:0,
    totalCustomers:0,
    totalBills:0,
    totalSales:0,
    inventoryValue:0,

    lowStockProducts:[],
    recentBills:[]

  });


  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadReports();

  },[]);




  const loadReports = async()=>{

    try{

      console.log("Loading reports...");

      const data = await getReports();

      console.log("Report Data:",data);


      setReport({

        totalProducts:data.totalProducts || 0,

        totalCustomers:data.totalCustomers || 0,

        totalBills:data.totalBills || 0,

        totalSales:data.totalSales || 0,

        inventoryValue:data.inventoryValue || 0,


        lowStockProducts:
        data.lowStockProducts || [],


        recentBills:
        data.recentBills || []

      });


    }
    catch(error){

      console.log(
        "Report Error:",
        error
      );

      toast.error(
        "Failed to load reports"
      );

    }
    finally{

      setLoading(false);

    }

  };




  const money=(value)=>{

    return new Intl.NumberFormat(
      "en-IN",
      {
        style:"currency",
        currency:"INR"
      }

    ).format(value || 0);

  };




  if(loading){

    return(

      <div className="p-10 text-center text-xl font-bold text-green-700">

        Loading Reports...

      </div>

    );

  }





  return(

<div className="p-6 bg-gray-50 min-h-screen">


<h1 className="text-3xl font-bold text-green-700 mb-2">

🌾 शेतकरी अॅग्रो Reports

</h1>


<p className="text-gray-500 mb-8">

Business Analytics Dashboard

</p>





<div className="grid md:grid-cols-5 gap-5">


<Card

title="Products"

value={report.totalProducts}

icon={<Package/>}

/>



<Card

title="Customers"

value={report.totalCustomers}

icon={<Users/>}

/>



<Card

title="Bills"

value={report.totalBills}

icon={<Receipt/>}

/>



<Card

title="Sales"

value={money(report.totalSales)}

icon={<IndianRupee/>}

/>



<Card

title="Inventory"

value={money(report.inventoryValue)}

icon={<Warehouse/>}

/>



</div>







<div className="bg-white rounded-xl shadow p-6 mt-8">


<h2 className="text-xl font-bold text-green-700 mb-5">

Low Stock Products

</h2>



{

report.lowStockProducts.length===0 ?


<p className="text-gray-500">

No Low Stock Products

</p>


:


<table className="w-full">

<tbody>

{

report.lowStockProducts.map(product=>(


<tr

key={product._id}

className="border-b"


>


<td className="p-3">

{product.productName}

</td>


<td className="p-3">

Stock : {product.currentStock}

</td>


</tr>


))

}


</tbody>

</table>


}


</div>







<div className="bg-white rounded-xl shadow p-6 mt-8">


<h2 className="text-xl font-bold text-green-700 mb-5">

Recent Bills

</h2>



{

report.recentBills.length===0 ?


<p className="text-gray-500">

No bills available

</p>


:


<table className="w-full">


<thead>

<tr className="bg-green-100">

<th className="p-3">

Customer

</th>


<th>

Amount

</th>


<th>

Status

</th>


</tr>

</thead>



<tbody>


{

report.recentBills.map(bill=>(


<tr

key={bill._id}

className="border-b"


>


<td className="p-3">

{

bill.customer?.name ||

"Unknown"

}

</td>


<td>

₹ {bill.grandTotal}

</td>


<td>

{bill.paymentStatus}

</td>


</tr>


))


}


</tbody>


</table>


}


</div>




</div>


  );


}





function Card({

title,

value,

icon

}){


return(

<div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">


<div>

<p className="text-gray-500">

{title}

</p>


<h2 className="text-2xl font-bold text-green-700">

{value}

</h2>


</div>



<div className="text-green-700">

{icon}

</div>



</div>


);


}