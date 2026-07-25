import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";


export default function LoginForm(){


    const {
        register,
        handleSubmit
    } = useForm();


    const navigate = useNavigate();



    const onSubmit = async(data)=>{


        try{


            toast.info(
                "Connecting to server..."
            );


            const response = await API.post(
                "/auth/login",
                {
                    username:data.username.trim(),
                    password:data.password
                },
                {
                    timeout:30000
                }
            );



            if(!response.data.token){

                throw new Error(
                    "Token not received"
                );

            }



            localStorage.removeItem("token");
            localStorage.removeItem("user");



            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );



            toast.success(
                "Login successful"
            );



            setTimeout(()=>{

                navigate("/dashboard");

            },500);



        }
        catch(error){


            console.log(
                "LOGIN ERROR",
                error
            );



            if(error.code==="ECONNABORTED"){

                toast.error(
                    "Server is waking up. Try again."
                );

            }

            else if(error.response){

                toast.error(

                    error.response.data?.message ||
                    "Invalid username or password"

                );


            }

            else{


                toast.error(
                    "Unable to connect with server"
                );


            }


        }


    };




    return(

        <form
        onSubmit={
            handleSubmit(onSubmit)
        }
        className="space-y-5"
        >


            <div>

                <label className="block text-sm font-medium mb-1">
                    Username
                </label>


                <input

                type="text"

                placeholder="Enter username"

                {...register(
                    "username",
                    {
                        required:true
                    }
                )}

                className="
                w-full
                px-4
                py-3
                border
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-green-600
                "

                />

            </div>




            <div>


                <label className="block text-sm font-medium mb-1">
                    Password
                </label>


                <input

                type="password"

                placeholder="Enter password"


                {...register(
                    "password",
                    {
                        required:true
                    }
                )}


                className="
                w-full
                px-4
                py-3
                border
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-green-600
                "

                />

            </div>




            <button

            type="submit"

            className="
            w-full
            bg-green-700
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-800
            "

            >

            Login

            </button>



        </form>

    );

}