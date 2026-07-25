import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// =======================
// LOGIN ADMIN
// =======================

export const login = async(req,res)=>{


    try{


        const {
            username,
            password
        } = req.body;





        // Validation

        if(
            !username ||
            !password
        ){


            return res.status(400).json({

                success:false,

                message:
                "Username and password required"

            });


        }







        // Find admin


        const admin =
        await Admin.findOne({

            username:username.trim()

        });





        if(!admin){


            return res.status(401).json({

                success:false,

                message:
                "Invalid username or password"

            });


        }








        // Password check


        const match =
        await bcrypt.compare(

            password,

            admin.password

        );





        if(!match){


            return res.status(401).json({

                success:false,

                message:
                "Invalid username or password"

            });


        }







        // Check JWT secret


        if(!process.env.JWT_SECRET){


            console.log(
                "JWT_SECRET missing"
            );


            return res.status(500).json({

                success:false,

                message:
                "Server configuration error"

            });


        }







        // Create Token


        const payload={


            id:admin._id,


            username:admin.username,


            role:
            admin.role || "admin"


        };





        const token =
        jwt.sign(

            payload,

            process.env.JWT_SECRET,

            {

                expiresIn:"7d"

            }

        );








        return res.status(200).json({


            success:true,


            message:
            "Login successful",



            token,



            user:payload



        });





    }

    catch(error){



        console.log(
            "LOGIN ERROR:",
            error.message
        );



        return res.status(500).json({

            success:false,

            message:
            "Server error"

        });



    }



};