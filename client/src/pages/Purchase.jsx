import {useEffect,useState} from "react";
import {toast} from "react-toastify";

import {
getProducts
} from "../services/productService";

import {
createPurchase
} from "../services/purchaseService";




export default function Purchase(){


const [products,setProducts]=useState([]);



const [supplierName,setSupplierName]=useState("");

const [paymentStatus,setPaymentStatus]=useState("Paid");



const [items,setItems]=useState([]);




const [item,setItem]=useState({

product:"",

quantity:1,

purchasePrice:0,

minimumStock:5,

expiryDate:""

});





useEffect(()=>{

loadProducts();

},[]);





const loadProducts=async()=>{


const data=await getProducts();

setProducts(data);


};







const addItem=()=>{


const product=

products.find(

p=>p._id===item.product

);



if(!product)

return toast.error(

"Select product"

);





setItems([

...items,

{

product:product._id,

productName:product.productName,

quantity:Number(item.quantity),

purchasePrice:Number(item.purchasePrice),

minimumStock:Number(item.minimumStock),

expiryDate:item.expiryDate,

total:

Number(item.quantity)*

Number(item.purchasePrice)

}

]);



};








const savePurchase=async()=>{


try{



await createPurchase({

supplierName,

items,

paymentStatus

});



toast.success(

"Purchase Added"

);



setItems([]);

setSupplierName("");

loadProducts();



}

catch(error){


console.log(error);


toast.error(

"Purchase failed"

);


}


};







return(


<div className="space-y-6">


<h1 className="text-3xl font-bold text-green-700">

Purchase Management

</h1>




<div className="bg-white p-6 rounded-xl shadow">


<input

name="supplierName"

placeholder="Supplier Name"

value={supplierName}

onChange={e=>

setSupplierName(e.target.value)

}

className="border p-3 rounded w-full mb-4"

/>





<select

name="product"

value={item.product}

onChange={e=>

setItem({

...item,

product:e.target.value

})

}

className="border p-3 rounded w-full mb-3"

>


<option>

Select Product

</option>


{

products.map(p=>(


<option

key={p._id}

value={p._id}

>


{p.productName}


</option>


))


}



</select>





<input

name="quantity"

type="number"

placeholder="Quantity"

value={item.quantity}

onChange={e=>

setItem({

...item,

quantity:e.target.value

})

}

className="border p-3 rounded mb-3"

/>





<input

name="purchasePrice"

type="number"

placeholder="Purchase Price"

value={item.purchasePrice}

onChange={e=>

setItem({

...item,

purchasePrice:e.target.value

})

}

className="border p-3 rounded mb-3"

/>





<input

name="minimumStock"

type="number"

placeholder="Minimum Stock"

value={item.minimumStock}

onChange={e=>

setItem({

...item,

minimumStock:e.target.value

})

}

className="border p-3 rounded mb-3"

/>






<input

name="expiryDate"

type="date"

value={item.expiryDate}

onChange={e=>

setItem({

...item,

expiryDate:e.target.value

})

}

className="border p-3 rounded mb-3"

/>





<button

onClick={addItem}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Add Item

</button>



</div>







<div className="bg-white p-6 shadow rounded-xl">


<h2 className="font-bold text-xl">

Items

</h2>


{

items.map((i,index)=>(

<div key={index} className="border p-3 mt-3">


{i.productName}

<br/>

Qty : {i.quantity}

<br/>

Expiry :

{i.expiryDate || "No expiry"}


</div>


))

}





<button

onClick={savePurchase}

className="bg-green-700 text-white px-6 py-3 rounded mt-5"

>


Save Purchase


</button>



</div>





</div>


);


}