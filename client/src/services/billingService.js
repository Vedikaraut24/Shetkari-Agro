import axios from "axios";

const API_URL = "http://localhost:5000/api";


// =======================
// SEARCH PRODUCTS
// =======================

export const searchProducts = async (keyword) => {

    const response = await axios.get(

        `${API_URL}/products/search`,

        {
            params:{
                keyword
            }
        }

    );

    return response.data;

};



// =======================
// CREATE BILL
// =======================

export const createBill = async (billData) => {

    const response = await axios.post(

        `${API_URL}/bills`,

        billData

    );

    return response.data;

};