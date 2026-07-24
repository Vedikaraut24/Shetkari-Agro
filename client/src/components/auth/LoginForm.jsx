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


            const response = await API.post(
                "/auth/login",
                {
                    username:data.username,
                    password:data.password
                }
            );



            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );



            toast.success(
                "Login successful"
            );


            navigate("/dashboard");



        }
        catch(error){


            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );


        }


    };



    return(

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        >


            <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
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

                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-600 outline-none"

                />

            </div>



            <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
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

                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-600 outline-none"

                />

            </div>




            <button

            type="submit"

            className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition"

            >

                Login

            </button>



        </form>

    );

}