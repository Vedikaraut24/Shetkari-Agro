import axios from "axios";


const API_URL = 
"http://localhost:5000/api/settings";



// GET SETTINGS

export const getSettings = async()=>{


    const response = await axios.get(

        API_URL

    );


    return response.data;


};




// UPDATE SETTINGS

export const updateSettings = async(data)=>{


    const response = await axios.put(

        API_URL,

        data

    );


    return response.data;


};