import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryTable({

    categories,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white shadow rounded-2xl overflow-hidden">

            <table className="w-full">

                <thead className="bg-green-700 text-white">

                    <tr>

                        <th className="p-4 text-left">

                            Category

                        </th>

                        <th className="p-4 text-left">

                            Description

                        </th>

                        <th className="p-4 text-center">

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

                                    className="text-center py-10 text-gray-500"

                                >

                                    No Categories Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            categories.map(category => (

                                <tr

                                    key={category._id}

                                    className="border-b hover:bg-gray-50"

                                >

                                    <td className="p-4 font-semibold">

                                        {category.name}

                                    </td>

                                    <td className="p-4">

                                        {

                                            category.description ||

                                            "-"

                                        }

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button

                                                onClick={() =>

                                                    onEdit(category)

                                                }

                                                className="text-blue-600"

                                            >

                                                <FaEdit />

                                            </button>

                                            <button

                                                onClick={() =>

                                                    onDelete(category)

                                                }

                                                className="text-red-600"

                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}