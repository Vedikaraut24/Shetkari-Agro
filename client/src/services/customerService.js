import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";



// =========================
// GET ALL CUSTOMERS
// =========================

export const getCustomers = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};



// =========================
// CREATE CUSTOMER
// =========================

export const createCustomer = async (customer) => {

    const response = await axios.post(

        API_URL,

        customer,

        {

            headers: {

                "Content-Type": "application/json"

            }

        }

    );

    return response.data;

};



// =========================
// UPDATE CUSTOMER
// =========================

export const updateCustomer = async (id, customer) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        customer

    );

    return response.data;

};



// =========================
// DELETE CUSTOMER
// =========================

export const deleteCustomer = async (id) => {

    const response = await axios.delete(

        `${API_URL}/${id}`

    );

    return response.data;

};