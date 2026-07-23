import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getTransactions } from "../services/transactionService";

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTransactions();

    }, []);

    const loadTransactions = async () => {

        try {

            const data = await getTransactions();

            setTransactions(data);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to load transactions");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="p-6">

                Loading...

            </div>

        );

    }

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold text-green-700 mb-6">

                💳 Transactions

            </h1>

            <div className="bg-white shadow rounded-xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-green-700 text-white">

                        <tr>

                            <th className="p-3">Date</th>

                            <th className="p-3">Customer</th>

                            <th className="p-3">Amount</th>

                            <th className="p-3">Type</th>

                            <th className="p-3">Payment</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            transactions.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center p-5"
                                        >

                                            No Transactions Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    transactions.map(transaction => (

                                        <tr
                                            key={transaction._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-3">

                                                {
                                                    new Date(transaction.createdAt)
                                                        .toLocaleDateString()
                                                }

                                            </td>

                                            <td className="p-3">

                                                {
                                                    transaction.customer?.name ||
                                                    "N/A"
                                                }

                                            </td>

                                            <td className="p-3 font-bold">

                                                ₹ {transaction.amount}

                                            </td>

                                            <td className="p-3">

                                                {transaction.type}

                                            </td>

                                            <td className="p-3">

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                                                    {transaction.paymentStatus}

                                                </span>

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