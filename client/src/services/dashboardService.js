import API from "./api";


export const getDashboard = async () => {

    try {

        const response = await API.get(
            "/dashboard"
        );


        console.log(
            "Dashboard API Response:",
            response.data
        );


        return response.data;


    } catch(error) {


        console.log(
            "Dashboard API Error:",
            error.response?.data || error.message
        );


        throw error;

    }

};