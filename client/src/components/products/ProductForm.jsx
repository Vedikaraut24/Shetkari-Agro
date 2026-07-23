import { useForm } from "react-hook-form";


export default function ProductForm({
    onSubmit,
    selectedProduct
}) {


const {
    register,
    handleSubmit,
    reset
}=useForm({
    defaultValues:selectedProduct || {}
});



return (

<form
onSubmit={handleSubmit(onSubmit)}
className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
>


<h2 className="text-xl font-bold text-green-700">
{
selectedProduct 
? "Edit Product"
:"Add Product"
}
</h2>



<input
{...register("productName")}
placeholder="Product Name"
className="w-full border p-3 rounded-xl"
/>



<input
{...register("category")}
placeholder="Category"
className="w-full border p-3 rounded-xl"
/>



<input
{...register("brand")}
placeholder="Brand"
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
{...register("purchasePrice")}
placeholder="Purchase Price"
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
{...register("sellingPrice")}
placeholder="Selling Price"
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
{...register("gst")}
placeholder="GST %"
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
{...register("currentStock")}
placeholder="Current Stock"
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
{...register("minimumStock")}
placeholder="Minimum Stock"
className="w-full border p-3 rounded-xl"
/>



<select
{...register("unit")}
className="w-full border p-3 rounded-xl"
>

<option value="kg">
kg
</option>

<option value="litre">
litre
</option>

<option value="bag">
bag
</option>

<option value="bottle">
bottle
</option>

<option value="packet">
packet
</option>


</select>




<input
type="date"
{...register("expiryDate")}
className="w-full border p-3 rounded-xl"
/>



<input
{...register("supplier")}
placeholder="Supplier"
className="w-full border p-3 rounded-xl"
/>



<button
className="w-full bg-gradient-to-r from-green-700 to-yellow-500 text-white py-3 rounded-xl font-semibold"
>

{
selectedProduct
?"Update Product"
:"Add Product"
}

</button>


</form>

);

}