import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// =======================
// LOGIN ADMIN
// =======================

export const login = async (req, res) => {


    try {


        const {
            username,
            password
        } = req.body;



        // Check input

        if(!username || !password){

            return res.status(400).json({

                success:false,

                message:"Username and password required"

            });

        }




        // Find admin

        const admin =
        await Admin.findOne({

            username

        });



        if(!admin){


            return res.status(401).json({

                success:false,

                message:"Invalid username or password"

            });


        }




        // Compare password

        const isMatch =
        await bcrypt.compare(

            password,

            admin.password

        );



        if(!isMatch){


            return res.status(401).json({

                success:false,

                message:"Invalid username or password"

            });


        }




        // Create JWT Token

        const token =
        jwt.sign(

            {

                id:admin._id,

                username:admin.username,

                role:admin.role || "admin"

            },

            process.env.JWT_SECRET,

            {

                expiresIn:"7d"

            }

        );





        res.status(200).json({

            success:true,

            message:"Login successful",


            token,


            user:{


                id:admin._id,

                username:admin.username,

                role:admin.role || "admin"


            }


        });



    }

    catch(error){


        console.log(
            "Login Error:",
            error
        );



        res.status(500).json({

            success:false,

            message:"Server error"

        });


    }


};