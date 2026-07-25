import API from "./api";



export const getProducts = async()=>{


    try{


        const res =
        await API.get("/products");


        return res.data;


    }

    catch(error){


        console.log(
            "GET PRODUCTS:",
            error.response?.data
        );


        throw error;


    }


};






export const createProduct = async(data)=>{


    try{


        const res =
        await API.post(

            "/products",

            data

        );


        return res.data;



    }

    catch(error){


        console.log(
            "CREATE PRODUCT:",
            error.response?.data
        );


        throw error;


    }


};







export const updateProduct = async(id,data)=>{


    try{


        const res =
        await API.put(

            `/products/${id}`,

            data

        );


        return res.data;



    }

    catch(error){


        console.log(
            "UPDATE PRODUCT:",
            error.response?.data
        );


        throw error;


    }


};







export const deleteProduct = async(id)=>{


    try{


        const res =
        await API.delete(

            `/products/${id}`

        );


        return res.data;



    }

    catch(error){


        console.log(
            "DELETE PRODUCT:",
            error.response?.data
        );


        throw error;


    }


};






export const importProducts = async(file)=>{


    try{


        const formData =
        new FormData();



        formData.append(
            "file",
            file
        );




        const res =
        await API.post(

            "/products/import",

            formData,

            {

                headers:{

                    "Content-Type":
                    "multipart/form-data"

                }

            }

        );



        return res.data;



    }

    catch(error){


        console.log(
            "IMPORT PRODUCT:",
            error.response?.data
        );


        throw error;


    }


};