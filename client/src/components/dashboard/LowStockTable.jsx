export default function LowStockTable({ products = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                ⚠️ Low Stock Products

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">

                            Product

                        </th>

                        <th>

                            Category

                        </th>

                        <th>

                            Stock

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.length === 0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="3"

                                        className="text-center py-10 text-gray-500"

                                    >

                                        No Low Stock Products

                                    </td>

                                </tr>

                            )

                            :

                            (

                                products.map(product => (

                                    <tr

                                        key={product._id}

                                        className="border-b"

                                    >

                                        <td className="py-3">

                                            {product.productName}

                                        </td>

                                        <td>

                                            {product.category}

                                        </td>

                                        <td className="text-red-600 font-bold">

                                            {product.currentStock}

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