import API from "./api";



// Get all products

export const getProducts = async()=>{

    const response =
    await API.get("/products");

    return response.data;

};




// Create product

export const createProduct = async(data)=>{

    const response =
    await API.post(
        "/products",
        data
    );

    return response.data;

};




// Update product

export const updateProduct = async(id,data)=>{

    const response =
    await API.put(
        `/products/${id}`,
        data
    );

    return response.data;

};




// Delete product

export const deleteProduct = async(id)=>{

    const response =
    await API.delete(
        `/products/${id}`
    );

    return response.data;

};




// Import CSV / Excel products

export const importProducts = async(file)=>{


    const formData = new FormData();


    formData.append(
        "file",
        file
    );


    const response =
    await API.post(

        "/products/import",

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );


    return response.data;

};