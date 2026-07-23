import { useEffect } from "react";
import { useForm } from "react-hook-form";


export default function CategoryForm({

    onSubmit,
    selectedCategory

}) {


    const {

        register,
        handleSubmit,
        reset

    } = useForm();



    useEffect(()=>{

        if(selectedCategory){

            reset({

                name:selectedCategory.name,

                description:selectedCategory.description || ""

            });

        }
        else{

            reset({

                name:"",

                description:""

            });

        }


    },[selectedCategory,reset]);



    const submitHandler=(data)=>{


        console.log("FINAL FORM DATA:",data);


        onSubmit({

            name:data.name,

            description:data.description

        });


    };



    return (

        <div className="bg-white shadow rounded-2xl p-6">


            <h2 className="text-2xl font-bold text-green-700 mb-5">

                {
                    selectedCategory
                    ?
                    "Update Category"
                    :
                    "Add Category"
                }

            </h2>



            <form

                onSubmit={handleSubmit(submitHandler)}

                className="space-y-4"

            >



                <div>


                    <label className="block mb-1">

                        Category Name

                    </label>



                    <input

                        {...register("name",{

                            required:true

                        })}


                        className="border w-full p-3 rounded-xl"

                        placeholder="Enter category name"

                    />


                </div>




                <div>


                    <label className="block mb-1">

                        Description

                    </label>



                    <textarea


                        {...register("description")}


                        rows="4"


                        className="border w-full p-3 rounded-xl"


                        placeholder="Enter description"


                    />


                </div>




                <button

                    type="submit"

                    className="w-full bg-green-700 text-white py-3 rounded-xl"

                >

                    {
                        selectedCategory
                        ?
                        "Update Category"
                        :
                        "Add Category"
                    }


                </button>



            </form>


        </div>

    );

}