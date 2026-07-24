import { Plus, Minus, Trash2 } from "lucide-react";

export default function BillingTable({

    items,
    setItems

}) {

    const increaseQty = (id) => {

        setItems(

            items.map(item =>

                item._id === id

                    ? {

                        ...item,

                        quantity: item.quantity + 1

                    }

                    : item

            )

        );

    };



    const decreaseQty = (id) => {

        setItems(

            items.map(item =>

                item._id === id

                    ? {

                        ...item,

                        quantity: Math.max(1, item.quantity - 1)

                    }

                    : item

            )

        );

    };



    const removeItem = (id) => {

        setItems(

            items.filter(

                item => item._id !== id

            )

        );

    };



    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-green-700 mb-5">

                Selected Products

            </h2>

            {

                items.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">

                        No products selected

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="bg-green-700 text-white">

                                    <th className="p-3 text-left">

                                        Product

                                    </th>

                                    <th className="p-3 text-center">

                                        Price

                                    </th>

                                    <th className="p-3 text-center">

                                        Qty

                                    </th>

                                    <th className="p-3 text-center">

                                        Total

                                    </th>

                                    <th className="p-3 text-center">

                                        Action

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    items.map(item => (

                                        <tr

                                            key={item._id}

                                            className="border-b"

                                        >

                                            <td className="p-3">

                                                {item.productName}

                                            </td>

                                            <td className="text-center">

                                                ₹ {item.sellingPrice}

                                            </td>

                                            <td className="text-center">

                                                <div className="flex justify-center items-center gap-2">

                                                    <button

                                                        onClick={() => decreaseQty(item._id)}

                                                        className="bg-gray-200 p-2 rounded"

                                                    >

                                                        <Minus size={16} />

                                                    </button>

                                                    <span className="font-bold">

                                                        {item.quantity}

                                                    </span>

                                                    <button

                                                        onClick={() => increaseQty(item._id)}

                                                        className="bg-green-600 text-white p-2 rounded"

                                                    >

                                                        <Plus size={16} />

                                                    </button>

                                                </div>

                                            </td>

                                            <td className="text-center font-semibold">

                                                ₹ {item.quantity * item.sellingPrice}

                                            </td>

                                            <td className="text-center">

                                                <button

                                                    onClick={() => removeItem(item._id)}

                                                    className="bg-red-600 text-white p-2 rounded"

                                                >

                                                    <Trash2 size={18} />

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}