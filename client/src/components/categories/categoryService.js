import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";


// GET ALL CATEGORIES

export const getCategories = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};


// CREATE CATEGORY

export const createCategory = async (data) => {

    const response = await axios.post(

        API_URL,

        data

    );

    return response.data;

};


// UPDATE CATEGORY

export const updateCategory = async (id, data) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        data

    );

    return response.data;

};


// DELETE CATEGORY

export const deleteCategory = async (id) => {

    const response = await axios.delete(

        `${API_URL}/${id}`

    );

    return response.data;

};