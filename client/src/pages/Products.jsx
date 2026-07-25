import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/productService";


export default function Products(){


    const [products,setProducts] = useState([]);


    const [form,setForm] = useState({

        productName:"",
        category:"",
        brand:"",
        purchasePrice:"",
        sellingPrice:"",
        gst:"",
        currentStock:"",
        minimumStock:"",
        unit:"packet"

    });



    const [editId,setEditId] = useState(null);



    useEffect(()=>{

        loadProducts();

    },[]);





    const loadProducts = async()=>{


        try{


            const data =
            await getProducts();


            setProducts(data);



        }

        catch(error){


            console.log(error);


            toast.error(
                "Failed to load products"
            );


        }


    };







    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });


    };








    const handleSubmit=async(e)=>{


        e.preventDefault();



        try{


            if(editId){


                await updateProduct(

                    editId,

                    form

                );


                toast.success(
                    "Product Updated"
                );


            }

            else{


                await createProduct(

                    form

                );


                toast.success(
                    "Product Added"
                );


            }




            setForm({

                productName:"",
                category:"",
                brand:"",
                purchasePrice:"",
                sellingPrice:"",
                gst:"",
                currentStock:"",
                minimumStock:"",
                unit:"packet"

            });



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


    };







    const handleDelete=async(id)=>{


        try{


            await deleteProduct(id);


            toast.success(
                "Product Deleted"
            );


            loadProducts();


        }

        catch(error){


            console.log(error);


            toast.error(
                "Delete failed"
            );


        }


    };







    const handleEdit=(product)=>{


        setEditId(product._id);



        setForm({

            productName:product.productName,

            category:product.category,

            brand:product.brand,

            purchasePrice:product.purchasePrice,

            sellingPrice:product.sellingPrice,

            gst:product.gst,

            currentStock:product.currentStock,

            minimumStock:product.minimumStock,

            unit:product.unit


        });



    };







    return(


<div className="space-y-8">



<h1 className="text-3xl font-bold text-green-700">

Products Management

</h1>





<div className="bg-white shadow rounded-xl p-6">


<form
onSubmit={handleSubmit}
className="grid md:grid-cols-3 gap-4"
>



<input
name="productName"
value={form.productName}
onChange={handleChange}
placeholder="Product Name"
className="border p-3 rounded"
/>



<input
name="category"
value={form.category}
onChange={handleChange}
placeholder="Category"
className="border p-3 rounded"
/>




<input
name="brand"
value={form.brand}
onChange={handleChange}
placeholder="Brand"
className="border p-3 rounded"
/>





<input
name="purchasePrice"
value={form.purchasePrice}
onChange={handleChange}
placeholder="Purchase Price"
type="number"
className="border p-3 rounded"
/>





<input
name="sellingPrice"
value={form.sellingPrice}
onChange={handleChange}
placeholder="Selling Price"
type="number"
className="border p-3 rounded"
/>





<input
name="gst"
value={form.gst}
onChange={handleChange}
placeholder="GST %"
type="number"
className="border p-3 rounded"
/>





<input
name="currentStock"
value={form.currentStock}
onChange={handleChange}
placeholder="Current Stock"
type="number"
className="border p-3 rounded"
/>





<input
name="minimumStock"
value={form.minimumStock}
onChange={handleChange}
placeholder="Minimum Stock"
type="number"
className="border p-3 rounded"
/>





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


<option value="litre">
Litre
</option>


<option value="bag">
Bag
</option>


<option value="bottle">
Bottle
</option>


</select>





<button

className="bg-green-700 text-white rounded p-3"

>


{
editId ?

"Update Product"

:

"Add Product"

}


</button>




</form>


</div>








<div className="bg-white shadow rounded-xl overflow-x-auto">


<table className="w-full">


<thead className="bg-green-700 text-white">


<tr>


<th className="p-3">
Name
</th>


<th className="p-3">
Category
</th>


<th className="p-3">
Stock
</th>


<th className="p-3">
Price
</th>


<th className="p-3">
Action
</th>


</tr>


</thead>



<tbody>



{

products.map((product)=>(



<tr
key={product._id}
className="border-b"
>



<td className="p-3">

{product.productName}

</td>



<td className="p-3">

{product.category}

</td>



<td className="p-3">

{product.currentStock}

</td>



<td className="p-3">

₹ {product.sellingPrice}

</td>



<td className="p-3 space-x-2">


<button

onClick={()=>handleEdit(product)}

className="bg-blue-600 text-white px-3 py-1 rounded"

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