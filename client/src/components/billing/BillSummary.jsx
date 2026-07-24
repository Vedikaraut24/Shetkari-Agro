import { toast } from "react-toastify";
import { createBill } from "../../services/billingService";

export default function BillSummary({

    customer,
    items

}) {

    const subtotal = items.reduce(

        (sum, item) =>

            sum + (item.sellingPrice * item.quantity),

        0

    );

    const gst = items.reduce(

        (sum, item) =>

            sum +

            (

                (item.sellingPrice * item.quantity)

                *

                (item.gst || 0)

                /

                100

            ),

        0

    );

    const grandTotal = subtotal + gst;



    const handleGenerateBill = async () => {

        try {

            if (!customer.name.trim()) {

                toast.error(

                    "Enter customer name"

                );

                return;

            }

            if (items.length === 0) {

                toast.error(

                    "Add at least one product"

                );

                return;

            }

            const bill = {

                customer,

                items,

                subtotal,

                gst,

                grandTotal,

                billDate: new Date()

            };

            await createBill(bill);

            toast.success(

                "Bill Generated Successfully"

            );

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to generate bill"

            );

        }

    };



    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-green-700 mb-5">

                Bill Summary

            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>

                        Subtotal

                    </span>

                    <span>

                        ₹ {subtotal.toFixed(2)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        GST

                    </span>

                    <span>

                        ₹ {gst.toFixed(2)}

                    </span>

                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold">

                    <span>

                        Grand Total

                    </span>

                    <span className="text-green-700">

                        ₹ {grandTotal.toFixed(2)}

                    </span>

                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">

                    <button

                        onClick={() => window.location.reload()}

                        className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleGenerateBill}

                        className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg"

                    >

                        Generate Bill

                    </button>

                </div>

            </div>

        </div>

    );

}