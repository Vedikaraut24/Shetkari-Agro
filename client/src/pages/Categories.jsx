import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";



export default function Categories(){


    const [categories,setCategories] = useState([]);


    const [categoryName,setCategoryName] = useState("");



    const [editId,setEditId] = useState(null);





    useEffect(()=>{


        loadCategories();


    },[]);







    const loadCategories = async()=>{


        try{


            const data =
            await getCategories();


            setCategories(data);



        }

        catch(error){


            console.log(error);


            toast.error(
                "Failed to load categories"
            );


        }


    };









    const handleSubmit = async(e)=>{


        e.preventDefault();



        if(!categoryName.trim()){


            toast.error(
                "Category name required"
            );


            return;


        }




        try{



            if(editId){


                await updateCategory(

                    editId,

                    {
                        name:categoryName
                    }

                );


                toast.success(
                    "Category updated"
                );


            }

            else{


                await createCategory({

                    name:categoryName

                });



                toast.success(
                    "Category added"
                );


            }





            setCategoryName("");

            setEditId(null);


            loadCategories();



        }

        catch(error){


            console.log(error);


            toast.error(

                error.response?.data?.message ||

                "Operation failed"

            );


        }


    };









    const handleEdit=(category)=>{


        setEditId(
            category._id
        );


        setCategoryName(

            category.name

        );


    };








    const handleDelete=async(id)=>{


        try{


            await deleteCategory(id);


            toast.success(
                "Category deleted"
            );


            loadCategories();


        }

        catch(error){


            console.log(error);


            toast.error(
                "Delete failed"
            );


        }


    };









    return(


        <div className="space-y-8">



            <h1 className="text-3xl font-bold text-green-700">

                Category Management

            </h1>





            {/* Add Category */}


            <div className="bg-white shadow rounded-xl p-6">


                <form

                onSubmit={handleSubmit}

                className="flex flex-col md:flex-row gap-4"

                >



                    <input

                    type="text"

                    placeholder="Enter category name"

                    value={categoryName}

                    onChange={(e)=>
                    
                        setCategoryName(
                            e.target.value
                        )

                    }

                    className="border p-3 rounded flex-1"

                    />





                    <button

                    className="bg-green-700 text-white px-6 py-3 rounded"

                    >

                    {
                        editId ?

                        "Update Category"

                        :

                        "Add Category"
                    }


                    </button>



                </form>


            </div>









            {/* Category List */}



            <div className="bg-white shadow rounded-xl overflow-hidden">


                <table className="w-full">


                    <thead className="bg-green-700 text-white">


                        <tr>


                            <th className="p-3 text-left">

                                Category Name

                            </th>


                            <th className="p-3 text-left">

                                Created Date

                            </th>


                            <th className="p-3">

                                Actions

                            </th>


                        </tr>


                    </thead>






                    <tbody>


                    {

                    categories.length === 0 ?


                    (

                        <tr>

                            <td

                            colSpan="3"

                            className="text-center p-5"

                            >

                            No categories found

                            </td>

                        </tr>

                    )


                    :


                    categories.map((category)=>(



                        <tr

                        key={category._id}

                        className="border-b"

                        >



                            <td className="p-3">

                                {category.name}

                            </td>





                            <td className="p-3">


                                {

                                new Date(
                                    category.createdAt
                                )
                                .toLocaleDateString(
                                    "en-IN"
                                )

                                }


                            </td>






                            <td className="p-3 space-x-2 text-center">



                                <button

                                onClick={()=>handleEdit(category)}

                                className="bg-blue-600 text-white px-3 py-1 rounded"

                                >

                                Edit

                                </button>






                                <button

                                onClick={()=>
                                    handleDelete(
                                        category._id
                                    )
                                }

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