import API from "./api";



// =======================
// SEARCH PRODUCTS
// =======================

export const searchProducts = async(keyword)=>{


    const response = await API.get(

        "/products/search",

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

export const createBill = async(billData)=>{


    const response =
    await API.post(

        "/bills",

        billData

    );


    return response.data;


};