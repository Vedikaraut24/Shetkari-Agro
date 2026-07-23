import axios from "axios";


const API_URL = "http://localhost:5000/api/products";



// GET ALL PRODUCTS

export const getProducts = async()=>{

    const response = await axios.get(
        API_URL
    );

    return response.data;

};




// CREATE PRODUCT

export const createProduct = async(data)=>{

    const response = await axios.post(
        API_URL,
        data
    );

    return response.data;

};




// UPDATE PRODUCT

export const updateProduct = async(id,data)=>{

    const response = await axios.put(
        `${API_URL}/${id}`,
        data
    );

    return response.data;

};




// DELETE PRODUCT

export const deleteProduct = async(id)=>{

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};




// IMPORT CSV / EXCEL

export const importProducts = async(file)=>{


    const formData = new FormData();


    formData.append(
        "file",
        file
    );


    console.log(
        "Sending file:",
        formData.get("file")
    );



    const response = await axios.post(

        `${API_URL}/import`,

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );



    console.log(
        "Import response:",
        response.data
    );



    return response.data;

};