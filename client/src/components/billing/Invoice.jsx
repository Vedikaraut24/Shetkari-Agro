import { generateInvoice } from "../../utils/generateInvoice";

export default function Invoice({ bill }) {

  if (!bill) return null;

  return (

    <div
      id="invoice"
      className="bg-white max-w-5xl mx-auto shadow-2xl rounded-2xl p-8 border border-gray-200"
    >

      {/* Header */}

      <div className="flex justify-between items-start border-b-2 border-green-700 pb-6">

        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-700 to-yellow-500 flex items-center justify-center text-4xl shadow-lg">
            🌾
          </div>

          <div>

            <h1 className="text-4xl font-bold text-green-700">
              शेतकरी अॅग्रो
            </h1>

            <p className="text-gray-600 mt-1">
              Agricultural Products & Services
            </p>

            <p className="text-sm text-gray-500">
              Maratha Complex,
              Near HDFC Bank,
              Bhaktidam Road,
              Chandur Bazaar,
              Amravati
            </p>

            <p className="text-sm text-gray-500">
              Phone : +91 9876543210
            </p>

          </div>

        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold text-gray-700">
            TAX INVOICE
          </h2>

          <p className="mt-3">
            <strong>Invoice No :</strong> {bill._id}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date(
              bill.createdAt || Date.now()
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            <span className="text-green-700 font-semibold">
              {bill.paymentStatus}
            </span>
          </p>

        </div>

      </div>

      {/* Customer & Shop */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-green-50 rounded-xl p-5">

          <h3 className="text-lg font-bold text-green-700 mb-3">
            Customer Details
          </h3>

          <p>
            <strong>Name :</strong>{" "}
            {bill.customer?.name ||
              bill.customerName ||
              "-"}
          </p>

          <p>
            <strong>Phone :</strong>{" "}
            {bill.customer?.phone ||
              bill.customerPhone ||
              "-"}
          </p>

          <p>
            <strong>Address :</strong>{" "}
            {bill.customer?.address ||
              bill.customerAddress ||
              "-"}
          </p>

        </div>

        <div className="bg-gray-50 rounded-xl p-5">

          <h3 className="text-lg font-bold text-green-700 mb-3">
            Shop Details
          </h3>

          <p className="font-bold text-lg">
            🌾 शेतकरी अॅग्रो
          </p>

          <p>
            Maratha Complex
          </p>

          <p>
            Near HDFC Bank
          </p>

          <p>
            Bhaktidam Road
          </p>

          <p>
            Chandur Bazaar, Amravati
          </p>

        </div>

      </div>

      {/* Products */}

      <div className="overflow-x-auto mt-8">

        <table className="w-full border border-gray-300">

          <thead>

            <tr className="bg-green-700 text-white">

              <th className="border p-3">
                Product
              </th>

              <th className="border">
                Qty
              </th>

              <th className="border">
                Price
              </th>

              <th className="border">
                GST
              </th>

              <th className="border">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {bill.items.map((item) => (

              <tr
                key={item._id}
                className="border-b text-center hover:bg-green-50"
              >

                <td className="border p-3">
                  {item.productName}
                </td>

                <td className="border">
                  {item.quantity}
                </td>

                <td className="border">
                  ₹ {item.price}
                </td>

                <td className="border">
                  {item.gst}%
                </td>

                <td className="border font-semibold">
                  ₹ {item.total}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {/* Totals */}

      <div className="flex justify-end mt-8">

        <div className="w-full md:w-96 bg-green-50 border border-green-200 rounded-xl p-6 shadow">

          <div className="flex justify-between mb-3">
            <span className="font-medium">Subtotal</span>
            <span>₹ {bill.subTotal || 0}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="font-medium">GST Amount</span>
            <span>₹ {bill.gstAmount || 0}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-2xl font-bold text-green-700">
            <span>Grand Total</span>
            <span>₹ {bill.grandTotal || 0}</span>
          </div>

        </div>

      </div>

      {/* Thank You */}

      <div className="mt-10 bg-green-50 rounded-xl p-5">

        <h3 className="text-lg font-bold text-green-700 mb-2">
          Thank You!
        </h3>

        <p className="text-gray-700">
          Thank you for shopping with
          <span className="font-bold text-green-700">
            {" "}🌾 शेतकरी अॅग्रो
          </span>.
        </p>

        <p className="text-gray-600 mt-2">
          We appreciate your trust in us and look forward to serving you again.
        </p>

      </div>

      {/* Footer */}

      <div className="border-t-2 border-green-700 mt-10 pt-6">

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h3 className="font-bold text-green-700 mb-2">
              Terms & Conditions
            </h3>

            <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">

              <li>
                Goods once sold will not be taken back.
              </li>

              <li>
                Please keep this invoice for future reference.
              </li>

              <li>
                Subject to Chandur Bazaar jurisdiction.
              </li>

            </ul>

          </div>

          <div className="text-right">

            <div className="h-20"></div>

            <p className="font-semibold">
              Authorized Signature
            </p>

            <p className="font-bold text-green-700 mt-3">
              🌾 शेतकरी अॅग्रो
            </p>

          </div>

        </div>

      </div>

      {/* Download */}

      <div className="flex justify-center mt-10">

        <button
          onClick={() => generateInvoice(bill)}
          className="bg-gradient-to-r from-green-700 to-yellow-500 hover:from-green-800 hover:to-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all"
        >
          📄 Download Invoice PDF
        </button>

      </div>

    </div>

  );

}