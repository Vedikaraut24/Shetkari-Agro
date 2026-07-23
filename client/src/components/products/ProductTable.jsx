export default function ProductTable({
  products,
  onDelete,
  onEdit
}) {


  const printTable = () => {
    window.print();
  };


  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">


      <div className="p-4 flex justify-end">

        <button
          onClick={printTable}
          className="bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          🖨 Print
        </button>

      </div>



      <div className="overflow-x-auto">

        <table className="w-full text-left">


          <thead className="bg-green-700 text-white">

            <tr>

              <th className="p-4">
                Product
              </th>

              <th>
                Category
              </th>

              <th>
                Brand
              </th>

              <th>
                Stock
              </th>

              <th>
                Price
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>



          <tbody>


            {
              products.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >

                    No Products Found

                  </td>

                </tr>


              ) : (


                products.map((product)=>(

                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50"
                  >


                    <td className="p-4 font-semibold">

                      {product.productName}

                    </td>



                    <td>

                      {product.category}

                    </td>



                    <td>

                      {product.brand || "-"}

                    </td>



                    <td>

                      {product.currentStock} {product.unit}

                    </td>



                    <td>

                      ₹ {product.sellingPrice}

                    </td>



                    <td>


                      {
                        product.currentStock <= product.minimumStock ?


                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

                          🔴 Low Stock

                        </span>


                        :


                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                          🟢 Available

                        </span>
                      }


                    </td>




                    <td className="space-x-2">


                      <button

                        onClick={() => onEdit(product)}

                        className="bg-yellow-400 px-3 py-1 rounded-lg"

                      >

                        Edit

                      </button>




                      <button

                        onClick={() => onDelete(product)}

                        className="bg-red-600 text-white px-3 py-1 rounded-lg"

                      >

                        Delete

                      </button>


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