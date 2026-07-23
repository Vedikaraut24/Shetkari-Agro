import {
useEffect,
useState
}
from "react";


import {
toast
}
from "react-toastify";


import {
getProducts
}
from "../services/productService";


import {
getCustomers
}
from "../services/customerService";


import {
createBill
}
from "../services/billService";





export default function Billing(){



const [customers,setCustomers]=useState([]);

const [products,setProducts]=useState([]);


const [customer,setCustomer]=useState("");


const [cart,setCart]=useState([]);





useEffect(()=>{


loadData();


},[]);





const loadData=async()=>{


try{


const c =
await getCustomers();


const p =
await getProducts();



setCustomers(c);

setProducts(p);



}
catch(error){

toast.error(
"Failed loading data"
);

}


};






const addProduct=(product)=>{


const existing =
cart.find(
item=>item.product===product._id
);



if(existing){


toast.info(
"Product already added"
);

return;

}



setCart([

...cart,

{

product:product._id,

productName:
product.productName,

quantity:1,

price:
product.sellingPrice,

gst:
product.gst

}

]);


};







const updateQuantity=(index,value)=>{


const updated=[...cart];


updated[index].quantity =
Number(value);



setCart(updated);


};







const calculateTotal=()=>{


let total=0;



cart.forEach(item=>{


total +=
item.price *
item.quantity;


});



return total;


};






const submitBill=async()=>{


if(!customer){

toast.error(
"Select customer"
);

return;

}



if(cart.length===0){

toast.error(
"Add products"
);

return;

}




try{


const result =
await createBill({

customer,

items:cart,

paymentStatus:"Paid"

});



toast.success(
"Bill Generated"
);



setCart([]);


}
catch(error){


console.log(error);


toast.error(
"Bill failed"
);


}



};







return(


<div className="p-6">


<h1 className="text-3xl font-bold text-green-700">

🧾 Billing System

</h1>




<div className="bg-white shadow rounded-xl p-5 mt-6">


<h2 className="font-bold mb-3">

Select Customer

</h2>


<select

className="border p-3 rounded-xl w-full"

value={customer}

onChange={
e=>setCustomer(e.target.value)
}

>


<option>

Choose Customer

</option>


{

customers.map(c=>(


<option

key={c._id}

value={c._id}

>

{c.name}

</option>


))

}


</select>



</div>







<div className="bg-white shadow rounded-xl p-5 mt-5">


<h2 className="font-bold mb-3">

Products

</h2>



<div className="grid md:grid-cols-3 gap-3">


{

products.map(p=>(


<button

key={p._id}

onClick={()=>
addProduct(p)
}

className="border p-3 rounded-xl hover:bg-green-100"

>


{p.productName}

<br/>

₹ {p.sellingPrice}

<br/>

Stock:
{p.currentStock}


</button>


))

}


</div>



</div>








<div className="bg-white shadow rounded-xl p-5 mt-5">


<h2 className="font-bold mb-3">

Cart

</h2>



{

cart.map((item,index)=>(


<div

key={index}

className="flex justify-between border-b p-3"

>


<span>

{item.productName}

</span>



<input

type="number"

min="1"

value={item.quantity}

onChange={
e=>
updateQuantity(
index,
e.target.value
)
}

className="border w-20"

/>



</div>


))

}



<h2 className="text-xl font-bold mt-5">

Total:
₹ {calculateTotal()}

</h2>





<button

onClick={submitBill}

className="bg-green-700 text-white px-5 py-3 rounded-xl mt-5"

>

Generate Bill

</button>



</div>




</div>


);


}