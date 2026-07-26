import API from "./api";




// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async()=>{

    const res = await API.get(
        "/products"
    );

    return res.data;

};







// ===============================
// SEARCH PRODUCTS
// ===============================

export const searchProducts = async(keyword)=>{


    const res = await API.get(

        `/products/search?keyword=${keyword}`

    );


    return res.data;


};








// ===============================
// CREATE PRODUCT
// ===============================

export const createProduct = async(data)=>{


    const res = await API.post(

        "/products",

        data

    );


    return res.data;


};








// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async(id,data)=>{


    const res = await API.put(

        `/products/${id}`,

        data

    );


    return res.data;


};








// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async(id)=>{


    const res = await API.delete(

        `/products/${id}`

    );


    return res.data;


};









// ===============================
// IMPORT PRODUCTS CSV
// ===============================

export const importProducts = async(products)=>{


    const res = await API.post(

        "/products/import",

        {
            products
        }

    );


    return res.data;


};