import { generateInvoice } from "../../utils/generateInvoice";


export default function Invoice({bill}){


return (

<div className="bg-white shadow-xl rounded-xl p-8">


<div className="flex justify-between items-center border-b pb-5">


<div className="flex items-center gap-4">


<div className="bg-green-700 rounded-full w-16 h-16 flex items-center justify-center">

<span className="text-3xl">

🌾

</span>

</div>



<div>

<h1 className="text-3xl font-bold text-green-700">

शेतकरी अॅग्रो

</h1>


<p className="text-gray-500">

Agriculture Products Store

</p>


<p className="text-sm">

📍 Maharashtra, India

</p>


</div>


</div>




<div className="text-right">

<h2 className="text-2xl font-bold">

INVOICE

</h2>


<p>

Date: {new Date().toLocaleDateString()}

</p>


</div>


</div>





<div className="mt-6 grid md:grid-cols-2 gap-5">


<div className="bg-green-50 p-4 rounded-lg">


<h3 className="font-bold text-green-700">

Customer Details

</h3>


<p>

Name: {bill.customer?.name}

</p>


<p>

Phone: {bill.customer?.phone}

</p>


</div>



<div className="bg-gray-50 p-4 rounded-lg">


<h3 className="font-bold">

Shop Address

</h3>


<p>

शेतकरी अॅग्रो

</p>


<p>

Nagpur, Maharashtra

</p>


</div>


</div>






<table className="w-full mt-8 border">


<thead className="bg-green-700 text-white">


<tr>


<th className="p-3">

Product

</th>


<th>

Qty

</th>


<th>

Price

</th>


<th>

Total

</th>


</tr>


</thead>



<tbody>


{

bill.items.map(item=>(


<tr key={item._id}

className="border-b text-center"


>


<td className="p-3">

{item.productName}

</td>


<td>

{item.quantity}

</td>


<td>

₹{item.price}

</td>


<td>

₹{item.total}

</td>


</tr>


))


}


</tbody>


</table>






<div className="mt-6 text-right space-y-2">


<p>

Subtotal:
₹{bill.subTotal}

</p>


<p>

GST:
₹{bill.gstAmount}

</p>


<h2 className="text-2xl font-bold text-green-700">

Grand Total:
₹{bill.grandTotal}

</h2>


</div>






<button

onClick={()=>generateInvoice(bill)}

className="mt-6 bg-green-700 text-white px-8 py-3 rounded-lg"

>


Download Invoice PDF


</button>



</div>


);


}