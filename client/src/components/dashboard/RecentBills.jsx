export default function RecentBills({ bills = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                🧾 Recent Bills

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">

                            Bill No

                        </th>

                        <th>

                            Customer

                        </th>

                        <th>

                            Amount

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bills.length === 0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="3"

                                        className="text-center py-10 text-gray-500"

                                    >

                                        No Bills Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                bills.map(bill => (

                                    <tr

                                        key={bill._id}

                                        className="border-b"

                                    >

                                        <td className="py-3">

                                            {bill.billNumber}

                                        </td>

                                        <td>

                                            {bill.customerName}

                                        </td>

                                        <td>

                                            ₹ {bill.totalAmount}

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