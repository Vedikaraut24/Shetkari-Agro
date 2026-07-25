import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../services/customerService";



export default function Customers(){


    const [customers,setCustomers] = useState([]);


    const [form,setForm] = useState({

        name:"",
        phone:"",
        email:"",
        address:""

    });



    const [editId,setEditId] = useState(null);





    useEffect(()=>{

        loadCustomers();

    },[]);








    const loadCustomers = async()=>{


        try{


            const data =
            await getCustomers();


            setCustomers(data);



        }

        catch(error){


            console.log(error);


            toast.error(
                "Failed to load customers"
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


                await updateCustomer(

                    editId,

                    form

                );


                toast.success(
                    "Customer updated"
                );


            }

            else{


                await createCustomer(

                    form

                );


                toast.success(
                    "Customer added"
                );


            }





            setForm({

                name:"",
                phone:"",
                email:"",
                address:""

            });



            setEditId(null);



            loadCustomers();



        }

        catch(error){


            console.log(error);


            toast.error(

                error.response?.data?.message ||

                "Operation failed"

            );


        }


    };









    const handleEdit=(customer)=>{


        setEditId(
            customer._id
        );


        setForm({

            name:customer.name || "",

            phone:customer.phone || "",

            email:customer.email || "",

            address:customer.address || ""

        });


    };









    const handleDelete=async(id)=>{


        try{


            await deleteCustomer(id);


            toast.success(
                "Customer deleted"
            );


            loadCustomers();


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

                Customer Management

            </h1>





            {/* Customer Form */}


            <div className="bg-white shadow rounded-xl p-6">


                <form

                onSubmit={handleSubmit}

                className="grid md:grid-cols-2 gap-4"

                >



                    <input

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                    placeholder="Customer Name"

                    className="border p-3 rounded"

                    required

                    />





                    <input

                    name="phone"

                    value={form.phone}

                    onChange={handleChange}

                    placeholder="Mobile Number"

                    className="border p-3 rounded"

                    required

                    />






                    <input

                    name="email"

                    value={form.email}

                    onChange={handleChange}

                    placeholder="Email"

                    type="email"

                    className="border p-3 rounded"

                    />






                    <input

                    name="address"

                    value={form.address}

                    onChange={handleChange}

                    placeholder="Address"

                    className="border p-3 rounded"

                    />







                    <button

                    className="bg-green-700 text-white p-3 rounded md:col-span-2"

                    >

                    {

                    editId ?

                    "Update Customer"

                    :

                    "Add Customer"

                    }


                    </button>



                </form>


            </div>









            {/* Customer Table */}



            <div className="bg-white shadow rounded-xl overflow-x-auto">


                <table className="w-full">


                    <thead className="bg-green-700 text-white">


                        <tr>


                            <th className="p-3 text-left">

                                Name

                            </th>


                            <th className="p-3 text-left">

                                Phone

                            </th>


                            <th className="p-3 text-left">

                                Email

                            </th>


                            <th className="p-3 text-left">

                                Address

                            </th>


                            <th className="p-3">

                                Action

                            </th>


                        </tr>


                    </thead>







                    <tbody>


                    {


                    customers.length===0 ?


                    (

                        <tr>

                            <td

                            colSpan="5"

                            className="text-center p-5"

                            >

                                No customers found

                            </td>

                        </tr>

                    )


                    :



                    customers.map((customer)=>(



                        <tr

                        key={customer._id}

                        className="border-b"

                        >



                            <td className="p-3">

                                {customer.name}

                            </td>





                            <td className="p-3">

                                {customer.phone}

                            </td>





                            <td className="p-3">

                                {customer.email || "-"}

                            </td>





                            <td className="p-3">

                                {customer.address || "-"}

                            </td>






                            <td className="p-3 space-x-2">



                                <button

                                onClick={()=>handleEdit(customer)}

                                className="bg-blue-600 text-white px-3 py-1 rounded"

                                >

                                    Edit

                                </button>






                                <button

                                onClick={()=>handleDelete(customer._id)}

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