import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  importProducts
} from "../services/productService";



export default function Products(){


const [products,setProducts]=useState([]);

const [selectedProduct,setSelectedProduct]=useState(null);

const [search,setSearch]=useState("");

const [category,setCategory]=useState("All");

const [sort,setSort]=useState("latest");

const [page,setPage]=useState(1);

const [importFile,setImportFile]=useState(null);



const productsPerPage=5;



const loadProducts=async()=>{

try{

const data=await getProducts();

setProducts(data);


}catch(error){

console.log(error);

toast.error(
"Failed to load products"
);

}

};




useEffect(()=>{

loadProducts();

},[]);





const handleSubmit=async(data)=>{


try{


if(selectedProduct){


await updateProduct(
selectedProduct._id,
data
);


toast.success(
"Product updated"
);


}
else{


await createProduct(data);


toast.success(
"Product added"
);


}



setSelectedProduct(null);

loadProducts();



}catch(error){


console.log(error);

toast.error(
"Operation failed"
);


}


};





const handleDelete=async(product)=>{


if(
!window.confirm(
`Delete ${product.productName}?`
)
)
return;



try{


await deleteProduct(
product._id
);


toast.success(
"Product deleted"
);


loadProducts();


}catch(error){

toast.error(
"Delete failed"
);

}

};






const handleImport=async()=>{


if(!importFile){

toast.error(
"Select CSV file"
);

return;

}



try{


const result =
await importProducts(
importFile
);



toast.success(
`${result.inserted} products imported`
);



setImportFile(null);


loadProducts();



}catch(error){


console.log(error);


toast.error(
"Import failed"
);


}

};







const downloadTemplate=()=>{


const csv=[

[
"productName",
"category",
"brand",
"purchasePrice",
"sellingPrice",
"gst",
"currentStock",
"minimumStock",
"unit",
"expiryDate",
"supplier"
],


[
"Urea Fertilizer",
"Fertilizer",
"ABC",
500,
650,
5,
100,
10,
"bag",
"",
"XYZ Supplier"
]

]

.map(row=>row.join(","))

.join("\n");



const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;

link.download=
"product_import_template.csv";


link.click();


};






const categories=[

"All",

...new Set(
products.map(
p=>p.category
)
)

];





const filteredProducts =
products

.filter(product=>

product.productName
.toLowerCase()
.includes(
search.toLowerCase()
)

)


.filter(product=>

category==="All"
||
product.category===category

)



.sort((a,b)=>{


if(sort==="priceHigh")

return b.sellingPrice-a.sellingPrice;


if(sort==="priceLow")

return a.sellingPrice-b.sellingPrice;


if(sort==="stock")

return b.currentStock-a.currentStock;


return new Date(b.createdAt)-new Date(a.createdAt);


});





const totalProducts =
products.length;



const totalStock =
products.reduce(
(sum,p)=>sum+p.currentStock,
0
);



const lowStock =
products.filter(
p=>p.currentStock<=p.minimumStock
).length;




const inventoryValue =
products.reduce(

(sum,p)=>
sum+(p.purchasePrice*p.currentStock),

0

);





const lastIndex =
page*productsPerPage;


const firstIndex =
lastIndex-productsPerPage;



const paginatedProducts =
filteredProducts.slice(
firstIndex,
lastIndex
);



const totalPages =
Math.ceil(
filteredProducts.length/productsPerPage
);





return(

<div className="p-6">


<h1 className="text-3xl font-bold text-green-700">

📦 Product Management

</h1>


<p className="text-gray-500 mb-6">

Shetkari Agro Inventory

</p>




<div className="grid md:grid-cols-4 gap-5 mb-8">


<div className="bg-white shadow rounded-xl p-5">

<p>Total Products</p>

<h2 className="text-3xl font-bold">

{totalProducts}

</h2>

</div>



<div className="bg-white shadow rounded-xl p-5">

<p>Total Stock</p>

<h2 className="text-3xl font-bold">

{totalStock}

</h2>

</div>




<div className="bg-white shadow rounded-xl p-5">

<p>Low Stock</p>

<h2 className="text-3xl font-bold text-red-600">

{lowStock}

</h2>

</div>




<div className="bg-white shadow rounded-xl p-5">

<p>Inventory Value</p>

<h2 className="text-xl font-bold">

₹ {inventoryValue}

</h2>

</div>


</div>





<div className="grid xl:grid-cols-3 gap-6">



<ProductForm

onSubmit={handleSubmit}

selectedProduct={selectedProduct}

/>





<div className="xl:col-span-2">



<div className="bg-white shadow rounded-xl p-4 grid md:grid-cols-3 gap-3 mb-4">


<input

placeholder="Search Product"

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="border p-3 rounded-xl"

/>



<select

value={category}

onChange={
e=>setCategory(e.target.value)
}

className="border p-3 rounded-xl"

>

{

categories.map(c=>(

<option key={c}>

{c}

</option>

))

}

</select>




<select

value={sort}

onChange={
e=>setSort(e.target.value)
}

className="border p-3 rounded-xl"

>


<option value="latest">
Latest
</option>


<option value="priceHigh">
Price High
</option>


<option value="priceLow">
Price Low
</option>


<option value="stock">
Stock
</option>


</select>


</div>






<div className="flex gap-3 mb-4 flex-wrap">


<button

onClick={downloadTemplate}

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

📄 Download Template

</button>




<input

type="file"

accept=".csv,.xlsx,.xls"

onChange={
e=>setImportFile(e.target.files[0])
}

className="border p-2 rounded-xl"

/>




<button

onClick={handleImport}

className="bg-green-700 text-white px-4 py-2 rounded-xl"

>

⬆ Import CSV / Excel

</button>


</div>





<ProductTable

products={paginatedProducts}

onDelete={handleDelete}

onEdit={
product=>setSelectedProduct(product)
}

/>





<div className="flex justify-center gap-4 mt-5">


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="bg-green-700 text-white px-4 py-2 rounded-xl"

>

Previous

</button>



<span>

{page}/{totalPages || 1}

</span>




<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="bg-green-700 text-white px-4 py-2 rounded-xl"

>

Next

</button>


</div>



</div>


</div>


</div>

);


}