import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/productService";



export default function Products(){


    const initialForm = {

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



    const [products,setProducts] = useState([]);

    const [form,setForm] = useState(initialForm);

    const [editId,setEditId] = useState(null);

    const [loading,setLoading] = useState(false);





    useEffect(()=>{

        loadProducts();

    },[]);






    const loadProducts = async()=>{


        try{


            const data = await getProducts();


            setProducts(
                Array.isArray(data)
                ? data
                : []
            );


        }

        catch(error){


            console.log(
                "LOAD PRODUCTS:",
                error
            );


            toast.error(

                error.response?.data?.message ||
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


            setLoading(true);



            const productData = {


                productName:
                form.productName.trim(),


                category:
                form.category.trim(),


                brand:
                form.brand.trim(),


                purchasePrice:
                Number(form.purchasePrice),


                sellingPrice:
                Number(form.sellingPrice),


                gst:
                Number(form.gst),


                currentStock:
                Number(form.currentStock),


                minimumStock:
                Number(form.minimumStock),


                unit:
                form.unit


            };





            if(editId){


                await updateProduct(

                    editId,

                    productData

                );


                toast.success(
                    "Product Updated"
                );


            }

            else{


                await createProduct(

                    productData

                );


                toast.success(
                    "Product Added"
                );


            }





            setForm(initialForm);


            setEditId(null);


            await loadProducts();



        }


        catch(error){


            console.log(
                "SUBMIT ERROR:",
                error
            );



            toast.error(

                error.response?.data?.message ||
                "Operation failed"

            );


        }


        finally{


            setLoading(false);


        }


    };









    const handleDelete=async(id)=>{


        try{


            await deleteProduct(id);



            toast.success(
                "Product Deleted"
            );



            await loadProducts();



        }

        catch(error){


            console.log(
                "DELETE ERROR:",
                error
            );


            toast.error(

                error.response?.data?.message ||
                "Delete failed"

            );


        }


    };









    const handleEdit=(product)=>{


        setEditId(product._id);


        setForm({

            productName:
            product.productName || "",


            category:
            product.category || "",


            brand:
            product.brand || "",


            purchasePrice:
            product.purchasePrice || 0,


            sellingPrice:
            product.sellingPrice || 0,


            gst:
            product.gst || 0,


            currentStock:
            product.currentStock || 0,


            minimumStock:
            product.minimumStock || 5,


            unit:
            product.unit || "packet"


        });



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    };









return (

<div className="space-y-8">


<h1 className="text-3xl font-bold text-green-700">

Products Management

</h1>





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

].map(([name,placeholder])=>(


<input

key={name}

name={name}

value={form[name]}

onChange={handleChange}

placeholder={placeholder}

type={
name.includes("Price") ||
name==="gst" ||
name.includes("Stock")
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

products.length===0

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


products.map(product=>(


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

$ {product.sellingPrice}

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