import { useState } from "react";
import { toast } from "react-toastify";

import {
    searchProducts
} from "../../services/productService";



export default function ProductSearch({
    items,
    setItems
}) {



    const [keyword,setKeyword] = useState("");

    const [suggestions,setSuggestions] = useState([]);





    const handleSearch = async(e)=>{


        const value = e.target.value;


        setKeyword(value);



        if(value.trim().length < 2){


            setSuggestions([]);

            return;


        }





        try{


            const data = await searchProducts(value);


            setSuggestions(data);



        }

        catch(error){


            console.log(
                "SEARCH ERROR",
                error
            );


            toast.error(
                "Product search failed"
            );


        }



    };








    const addProduct = (product)=>{


        const alreadyAdded = items.find(

            item => item._id === product._id

        );



        if(alreadyAdded){


            toast.info(
                "Product already added"
            );


            return;


        }





        if(product.currentStock <= 0){


            toast.error(
                "Product out of stock"
            );


            return;


        }







        setItems([

            ...items,

            {

                _id:product._id,

                productName:
                product.productName,


                sellingPrice:
                product.sellingPrice,


                quantity:1,


                gst:
                product.gst || 0


            }


        ]);



        setKeyword("");

        setSuggestions([]);



    };







return (

<div className="relative">


<input


type="text"


value={keyword}


onChange={handleSearch}


placeholder="Search Product"


className="border p-3 rounded w-full"



/>






{

suggestions.length > 0 &&


<div className="absolute z-20 bg-white shadow-lg w-full rounded mt-1">



{

suggestions.map(product=>(


<div


key={product._id}


onClick={()=>addProduct(product)}



className="p-3 border-b cursor-pointer hover:bg-gray-100"



>



<div className="font-semibold">


{product.productName}


</div>




<div className="text-sm text-gray-600">


Price:
₹{product.sellingPrice}


&nbsp; | &nbsp;


Stock:
{product.currentStock}



</div>



</div>


))


}



</div>


}



</div>

);


}