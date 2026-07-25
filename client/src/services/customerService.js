import API from "./api";



// ===============================
// GET ALL CUSTOMERS
// ===============================

export const getCustomers = async()=>{

    const response =
    await API.get("/customers");


    return response.data;

};





// ===============================
// CREATE CUSTOMER
// ===============================

export const createCustomer = async(data)=>{


    const response =
    await API.post(

        "/customers",

        data

    );


    return response.data;


};






// ===============================
// UPDATE CUSTOMER
// ===============================

export const updateCustomer = async(id,data)=>{


    const response =
    await API.put(

        `/customers/${id}`,

        data

    );


    return response.data;


};







// ===============================
// DELETE CUSTOMER
// ===============================

export const deleteCustomer = async(id)=>{


    const response =
    await API.delete(

        `/customers/${id}`

    );


    return response.data;


};







// ===============================
// SEARCH CUSTOMER FOR BILLING
// ===============================

export const searchCustomers = async(keyword)=>{


    const response =
    await API.get(

        `/customers/search?keyword=${keyword}`

    );


    return response.data;


};