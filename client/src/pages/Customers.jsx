import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../services/customerService";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load customers");
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (selectedCustomer) {
                await updateCustomer(selectedCustomer._id, data);
                toast.success("Customer updated successfully");
            } else {
                await createCustomer(data);
                toast.success("Customer added successfully");
            }

            setSelectedCustomer(null);
            fetchCustomers();

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to save customer"
            );
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {
            await deleteCustomer(id);

            toast.success("Customer deleted");

            fetchCustomers();

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    return (
        <div className="p-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-green-700">
                    👥 Customer Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your customers easily.
                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div>

                    <CustomerForm
                        onSubmit={handleSubmit}
                        selectedCustomer={selectedCustomer}
                    />

                </div>

                <div className="lg:col-span-2">

                    <CustomerTable
                        customers={customers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </div>

            </div>

        </div>
    );
}