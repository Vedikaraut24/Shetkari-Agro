import { Pencil, Trash2, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function CustomerTable({

    customers,
    onEdit,
    onDelete

}) {

    const [search, setSearch] = useState("");



    const filteredCustomers = useMemo(() => {

        return customers.filter(customer =>

            customer.name?.toLowerCase().includes(search.toLowerCase()) ||

            customer.phone?.includes(search) ||

            customer.email?.toLowerCase().includes(search.toLowerCase())

        );

    }, [customers, search]);



    return (

        <div className="bg-white rounded-xl shadow-lg p-6">


            <div className="flex items-center justify-between mb-5">


                <h2 className="text-2xl font-bold text-green-700">

                    Customers

                </h2>



                <div className="relative">

                    <Search

                        size={18}

                        className="absolute left-3 top-3 text-gray-500"

                    />

                    <input

                        type="text"

                        placeholder="Search Customer..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        className="pl-10 pr-4 py-2 border rounded-lg"

                    />

                </div>

            </div>



            <div className="overflow-x-auto">


                <table className="w-full border-collapse">


                    <thead>

                        <tr className="bg-green-700 text-white">

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

                            <th className="p-3 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>



                    <tbody>

                        {

                            filteredCustomers.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center py-8 text-gray-500"

                                    >

                                        No customers found

                                    </td>

                                </tr>

                            )

                            :

                            filteredCustomers.map(customer=>(

                                <tr

                                    key={customer._id}

                                    className="border-b hover:bg-green-50"

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

                                    <td className="p-3">

                                        <div className="flex justify-center gap-3">

                                            <button

                                                onClick={() => onEdit(customer)}

                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"

                                            >

                                                <Pencil size={18} />

                                            </button>



                                            <button

                                                onClick={() => onDelete(customer._id)}

                                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"

                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

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