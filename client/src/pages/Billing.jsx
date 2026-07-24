import { useState } from "react";
import { toast } from "react-toastify";

import CustomerDetails from "../components/billing/CustomerDetails";
import ProductSearch from "../components/billing/ProductSearch";
import Invoice from "../components/billing/Invoice";

import { createBill } from "../services/billingService";



export default function Billing() {


    const [customer,setCustomer] = useState({

        name:"",
        phone:"",
        address:""

    });



    const [items,setItems] = useState([]);



    const [generatedBill,setGeneratedBill] = useState(null);



    const [paymentStatus,setPaymentStatus] = useState("Paid");






    const calculateTotal = () => {


        let subTotal = 0;


        items.forEach(item=>{


            subTotal +=

            item.sellingPrice *

            item.quantity;



        });



        return subTotal;


    };







    const handleQuantity = (index,value)=>{


        const updated = [...items];


        updated[index].quantity = Number(value);


        setItems(updated);


    };







    const removeProduct=(index)=>{


        const updated = items.filter(

            (_,i)=>i!==index

        );


        setItems(updated);


    };








    const handleGenerateBill = async()=>{


        try{


            if(!customer.name || !customer.phone){


                toast.error(

                    "Customer details required"

                );


                return;

            }




            if(items.length===0){


                toast.error(

                    "Select products"

                );


                return;

            }





            const billData = {


                customer,


                items: items.map(item=>({


                    _id:item._id,


                    quantity:item.quantity


                })),



                paymentStatus


            };






            const response = await createBill(

                billData

            );





            setGeneratedBill(

                response.bill

            );



            toast.success(

                "Bill Generated Successfully"

            );



            setItems([]);



        }



        catch(error){


            console.log(error);



            toast.error(

                error.response?.data?.message ||

                "Bill Failed"

            );


        }


    };







return (

<div className="space-y-8">



<h1 className="text-3xl font-bold text-green-700">

Billing

</h1>





<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">



<div>


<CustomerDetails


customer={customer}


setCustomer={setCustomer}


/>



</div>





<div>


<ProductSearch


items={items}


setItems={setItems}


/>



</div>



</div>








<div className="bg-white shadow rounded-xl p-6">



<h2 className="text-2xl font-bold text-green-700 mb-5">

Cart

</h2>





<table className="w-full">



<thead>


<tr className="bg-green-700 text-white">


<th className="p-3">

Product

</th>


<th>

Price

</th>


<th>

Qty

</th>


<th>

Total

</th>


<th>

Action

</th>


</tr>


</thead>






<tbody>


{

items.map((item,index)=>(


<tr

key={item._id}

className="border-b"


>



<td className="p-3">

{item.productName}

</td>




<td>

₹{item.sellingPrice}

</td>




<td>


<input


type="number"


min="1"


value={item.quantity}


onChange={(e)=>

handleQuantity(

index,

e.target.value

)

}



className="border p-2 w-20 rounded"



/>


</td>






<td>


₹{

item.sellingPrice *

item.quantity

}



</td>







<td>


<button


onClick={()=>removeProduct(index)}



className="bg-red-600 text-white px-3 py-1 rounded"



>


Remove


</button>



</td>




</tr>



))

}




</tbody>


</table>






<div className="mt-5">


<h3 className="text-xl font-bold">

Subtotal:

₹{calculateTotal()}

</h3>



<select


value={paymentStatus}


onChange={(e)=>

setPaymentStatus(e.target.value)

}



className="border p-3 rounded mt-3"



>


<option>

Paid

</option>


<option>

Pending

</option>



</select>



</div>







<button


onClick={handleGenerateBill}



className="mt-6 bg-green-700 text-white px-8 py-3 rounded-lg"



>


Generate Bill


</button>



</div>







{

generatedBill &&

<Invoice

bill={generatedBill}

/>

}



</div>

);


}