import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerForm({

    onSubmit,
    selectedCustomer

}) {

    const {

        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm();

    useEffect(() => {

        if (selectedCustomer) {

            reset({

                name: selectedCustomer.name || "",

                phone: selectedCustomer.phone || "",

                email: selectedCustomer.email || "",

                address: selectedCustomer.address || ""

            });

        } else {

            reset({

                name: "",

                phone: "",

                email: "",

                address: ""

            });

        }

    }, [selectedCustomer, reset]);

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-green-700 mb-6">

                {selectedCustomer ? "Update Customer" : "Add Customer"}

            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                {/* Customer Name */}

                <div>

                    <label className="font-medium">

                        Customer Name

                    </label>

                    <input

                        {...register("name", {

                            required: "Customer name is required"

                        })}

                        className="w-full mt-2 border rounded-lg p-3"

                        placeholder="Enter customer name"

                    />

                    {errors.name && (

                        <p className="text-red-600 text-sm mt-1">

                            {errors.name.message}

                        </p>

                    )}

                </div>

                {/* Phone */}

                <div>

                    <label className="font-medium">

                        Phone Number

                    </label>

                    <input

                        {...register("phone", {

                            required: "Phone number is required"

                        })}

                        className="w-full mt-2 border rounded-lg p-3"

                        placeholder="9876543210"

                    />

                    {errors.phone && (

                        <p className="text-red-600 text-sm mt-1">

                            {errors.phone.message}

                        </p>

                    )}

                </div>

                {/* Email */}

                <div>

                    <label className="font-medium">

                        Email

                    </label>

                    <input

                        {...register("email")}

                        className="w-full mt-2 border rounded-lg p-3"

                        placeholder="customer@email.com"

                    />

                </div>

                {/* Address */}

                <div>

                    <label className="font-medium">

                        Address

                    </label>

                    <textarea

                        {...register("address")}

                        rows={4}

                        className="w-full mt-2 border rounded-lg p-3"

                        placeholder="Customer address"

                    />

                </div>

                <button

                    type="submit"

                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"

                >

                    {selectedCustomer ? "Update Customer" : "Add Customer"}

                </button>

            </form>

        </div>

    );

}