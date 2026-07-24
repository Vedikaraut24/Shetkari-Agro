import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { searchProducts } from "../../services/billingService";

export default function ProductSearch({

    items,
    setItems

}) {

    const [keyword, setKeyword] = useState("");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);



    useEffect(() => {


        const fetchProducts = async () => {


            if (!keyword.trim()) {

                setProducts([]);

                return;

            }


            try {

                setLoading(true);


                const data = await searchProducts(keyword);


                setProducts(data);


            }

            catch(error){

                console.log(error);

            }

            finally{

                setLoading(false);

            }


        };



        const timer = setTimeout(

            fetchProducts,

            300

        );



        return () => clearTimeout(timer);



    },[keyword]);





    const addProduct = (product)=>{


        const exists = items.find(

            item => item._id === product._id

        );



        if(exists){

            alert(

                "Product already added"

            );

            return;

        }



        setItems([

            ...items,

            {

                ...product,

                quantity:1

            }

        ]);



        setKeyword("");

        setProducts([]);



    };




    return (

        <div className="bg-white rounded-xl shadow-lg p-6 relative">


            <h2 className="text-2xl font-bold text-green-700 mb-5">

                Search Product

            </h2>



            <div className="relative">


                <Search

                    size={20}

                    className="absolute left-3 top-3 text-gray-500"

                />



                <input


                    type="text"


                    value={keyword}


                    onChange={(e)=>

                        setKeyword(e.target.value)

                    }


                    placeholder="Search product name..."


                    className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-600"

                />



            </div>





            {/* Dropdown */}


            {

                products.length > 0 && (


                    <div className="absolute z-50 left-6 right-6 mt-2 bg-white border rounded-lg shadow-xl max-h-72 overflow-y-auto">


                        {


                            products.map(product=>(


                                <div


                                    key={product._id}


                                    onClick={()=>addProduct(product)}


                                    className="p-4 cursor-pointer hover:bg-green-100 border-b"



                                >


                                    <div className="flex justify-between">


                                        <div>


                                            <p className="font-semibold text-gray-800">

                                                {product.productName}

                                            </p>


                                            <p className="text-sm text-gray-500">

                                                Category: {product.category}

                                            </p>


                                        </div>




                                        <div className="text-right">


                                            <p className="font-bold text-green-700">

                                                ₹{product.sellingPrice}

                                            </p>


                                            <p className="text-sm">

                                                Stock: {product.currentStock}

                                            </p>


                                        </div>



                                    </div>



                                </div>



                            ))

                        }


                    </div>


                )

            }





            {

                loading && (

                    <p className="text-gray-500 mt-3">

                        Searching...

                    </p>

                )

            }



        </div>

    );

}