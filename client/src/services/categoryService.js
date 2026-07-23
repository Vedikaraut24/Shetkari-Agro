import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";


export const getCategories = async()=>{

    const res = await axios.get(API_URL);

    return res.data;

};



export const createCategory = async(data)=>{

    console.log("Sending Category:",data);

    const res = await axios.post(

        API_URL,

        data,

        {
            headers:{
                "Content-Type":"application/json"
            }
        }

    );

    return res.data;

};



export const updateCategory = async(id,data)=>{

    const res = await axios.put(

        `${API_URL}/${id}`,

        data

    );

    return res.data;

};



export const deleteCategory = async(id)=>{

    const res = await axios.delete(

        `${API_URL}/${id}`

    );

    return res.data;

};