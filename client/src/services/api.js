import axios from "axios";



const API = axios.create({


    baseURL:

    import.meta.env.VITE_API_URL ||

    "https://shetkari-agro.onrender.com/api",


    timeout:15000,


});







// ===============================
// ADD JWT TOKEN
// ===============================


API.interceptors.request.use(


    (config)=>{


        const token =

        localStorage.getItem("token");




        if(token){


            config.headers.Authorization =

            `Bearer ${token}`;


        }





        return config;



    },



    (error)=>{


        return Promise.reject(error);


    }



);









// ===============================
// GLOBAL ERROR HANDLER
// ===============================


API.interceptors.response.use(


    (response)=>{


        return response;


    },



    (error)=>{



        if(error.response){



            console.log(

                "SERVER ERROR:",

                error.response.status,

                error.response.data

            );



            // Token expired

            if(error.response.status === 401){


                localStorage.removeItem("token");

                localStorage.removeItem("user");


                window.location.href="/login";


            }



        }

        else{


            console.log(

                "NETWORK ERROR:",

                error.message

            );


        }





        return Promise.reject(error);



    }


);





export default API;