export default function RecentBills({ bills = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-5">

            <h2 className="text-xl font-bold text-green-700 mb-5">

                🧾 Recent Bills

            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-green-50">

                            <th className="text-left py-3 px-2">

                                Bill ID

                            </th>

                            <th className="text-left px-2">

                                Customer

                            </th>

                            <th className="text-right px-2">

                                Amount

                            </th>

                            <th className="text-center px-2">

                                Date

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            bills.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="4"

                                        className="text-center py-10 text-gray-500"

                                    >

                                        No Bills Found

                                    </td>

                                </tr>

                            ) : (

                                bills.map((bill) => (

                                    <tr

                                        key={bill._id}

                                        className="border-b hover:bg-gray-50"

                                    >

                                        <td className="py-3 px-2 font-medium">

                                            #{bill._id.slice(-6).toUpperCase()}

                                        </td>

                                        <td className="px-2">

                                            {bill.customer?.name || "Walk-in Customer"}

                                        </td>

                                        <td className="text-right px-2 font-semibold text-green-700">

                                            ₹ {Number(bill.grandTotal).toLocaleString()}

                                        </td>

                                        <td className="text-center px-2">

                                            {new Date(

                                                bill.createdAt

                                            ).toLocaleDateString("en-IN")}

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}