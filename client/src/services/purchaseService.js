import API from "./api";


export const createPurchase = async(data)=>{


const res = await API.post(

"/purchases",

data

);


return res.data;


};