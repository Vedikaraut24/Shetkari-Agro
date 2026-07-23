import axios from "axios";


const API_URL =
"http://localhost:5000/api/customers";




// GET CUSTOMERS

export const getCustomers = async()=>{


const response =
await axios.get(
API_URL
);


return response.data;


};





// CREATE CUSTOMER

export const createCustomer = async(data)=>{


const response =
await axios.post(

API_URL,

data

);


return response.data;


};