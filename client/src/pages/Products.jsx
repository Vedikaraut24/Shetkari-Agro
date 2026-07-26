import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    importProducts
} from "../services/productService";



export default function Products(){


const initialForm={

    productName:"",
    category:"",
    brand:"",
    purchasePrice:"",
    sellingPrice:"",
    gst:0,
    currentStock:0,
    minimumStock:5,
    unit:"packet"

};



const [products,setProducts]=useState([]);

const [form,setForm]=useState(initialForm);

const [editId,setEditId]=useState(null);

const [loading,setLoading]=useState(false);

const [search,setSearch]=useState("");





useEffect(()=>{

    loadProducts();

},[]);





const loadProducts=async()=>{

try{


const data=await getProducts();


setProducts(

Array.isArray(data)

?

data

:

[]

);


}

catch(error){


console.log(error);


toast.error("Failed to load products");


}

};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();


try{


setLoading(true);



const data={


productName:form.productName,


category:form.category,


brand:form.brand,


purchasePrice:Number(form.purchasePrice),


sellingPrice:Number(form.sellingPrice),


gst:Number(form.gst),


currentStock:Number(form.currentStock),


minimumStock:Number(form.minimumStock),


unit:form.unit


};





if(editId){


await updateProduct(editId,data);


toast.success("Product updated");


}

else{


await createProduct(data);


toast.success("Product added");


}





setForm(initialForm);

setEditId(null);


loadProducts();



}

catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||

"Operation failed"

);


}

finally{

setLoading(false);

}


};









const handleEdit=(product)=>{


setEditId(product._id);


setForm({


productName:product.productName || "",


category:

product.category?._id ||

product.category ||

"",


brand:product.brand || "",


purchasePrice:product.purchasePrice || 0,


sellingPrice:product.sellingPrice || 0,


gst:product.gst || 0,


currentStock:product.currentStock || 0,


minimumStock:product.minimumStock || 5,


unit:product.unit || "packet"


});



window.scrollTo({

top:0,

behavior:"smooth"

});


};









const handleDelete=async(id)=>{


try{


await deleteProduct(id);


toast.success("Product deleted");


loadProducts();


}

catch(error){


toast.error(

error.response?.data?.message ||

"Delete failed"

);


}


};









// ===========================
// CSV IMPORT
// ===========================

const handleCSV=(e)=>{


const file=e.target.files[0];


if(!file)

return;



const reader=new FileReader();



reader.onload=async(event)=>{


try{


const rows = event.target.result

.split("\n")

.slice(1);



const products = rows

.filter(row=>row.trim())

.map(row=>{


const [

productName,

purchasePrice,

sellingPrice,

currentStock,

minimumStock,

category,

brand

]=row.split(",");



return {


productName,


purchasePrice:Number(purchasePrice),


sellingPrice:Number(sellingPrice),


currentStock:Number(currentStock),


minimumStock:Number(minimumStock),


category,


brand


};


});





await importProducts(products);



toast.success(

"CSV imported successfully"

);



loadProducts();



}

catch(error){


console.log(error);


toast.error(

"CSV import failed"

);


}


};



reader.readAsText(file);


};









const filteredProducts = products.filter(product=>

product.productName

.toLowerCase()

.includes(

search.toLowerCase()

)

);









return (

<div className="space-y-8">



<h1 className="text-3xl font-bold text-green-700">

Products Management

</h1>









{/* CSV IMPORT */}


<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold text-green-700 mb-3">

Import Products CSV

</h2>


<input

type="file"

accept=".csv"

onChange={handleCSV}

className="border p-3 rounded"

/>


<p className="text-sm text-gray-500 mt-2">

CSV format:

productName,purchasePrice,sellingPrice,currentStock,minimumStock,category,brand

</p>


</div>









{/* ADD PRODUCT */}


<div className="bg-white shadow rounded-xl p-6">


<form

onSubmit={handleSubmit}

className="grid md:grid-cols-3 gap-4"

>


{

[

["productName","Product Name"],

["category","Category"],

["brand","Brand"],

["purchasePrice","Purchase Price"],

["sellingPrice","Selling Price"],

["gst","GST %"],

["currentStock","Current Stock"],

["minimumStock","Minimum Stock"]

]

.map(([name,label])=>(


<input

key={name}

name={name}

value={form[name]}

onChange={handleChange}

placeholder={label}

type={

name.includes("Price") ||

name.includes("Stock") ||

name==="gst"

?

"number"

:

"text"

}

className="border p-3 rounded"

/>


))


}







<select

name="unit"

value={form.unit}

onChange={handleChange}

className="border p-3 rounded"

>


<option value="packet">

Packet

</option>


<option value="kg">

Kg

</option>


<option value="bag">

Bag

</option>


<option value="litre">

Litre

</option>


</select>







<button

disabled={loading}

className="bg-green-700 text-white rounded p-3"

>


{

loading

?

"Saving..."

:

editId

?

"Update Product"

:

"Add Product"

}


</button>



</form>


</div>









{/* SEARCH */}


<input

placeholder="Search product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded w-full"

/>









{/* PRODUCT TABLE */}


<div className="bg-white shadow rounded-xl overflow-x-auto">


<table className="w-full">


<thead className="bg-green-700 text-white">


<tr>

<th className="p-3">

Name

</th>


<th>

Category

</th>


<th>

Stock

</th>


<th>

Price

</th>


<th>

Action

</th>


</tr>


</thead>





<tbody>


{

filteredProducts.length===0

?

<tr>

<td

colSpan="5"

className="text-center p-5"

>

No products found

</td>

</tr>



:

filteredProducts.map(product=>(


<tr

key={product._id}

className="border-b"

>


<td className="p-3">

{product.productName}

</td>





<td>


{

product.category?.name ||

product.category ||

"-"

}


</td>





<td>


<span

className={

product.currentStock <= product.minimumStock

?

"text-red-600 font-bold"

:

""

}

>


{product.currentStock}


</span>


</td>





<td>

₹ {product.sellingPrice}

</td>






<td>


<button

onClick={()=>handleEdit(product)}

className="bg-blue-600 text-white px-3 py-1 rounded mr-2"

>

Edit

</button>





<button

onClick={()=>handleDelete(product._id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>


</td>


</tr>


))


}


</tbody>


</table>


</div>






</div>


);


}