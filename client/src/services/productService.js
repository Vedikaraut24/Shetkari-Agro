import api from "./api";


// Get all products
export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};


// Create product
export const createProduct = async (data) => {
    const response = await api.post("/products", data);
    return response.data;
};


// Update product
export const updateProduct = async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
};


// Delete product
export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};