import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// =======================
// ADMIN LOGIN
// =======================

export const login = async (req, res) => {


    try {


        const {
            username,
            password
        } = req.body;



        // =======================
        // VALIDATION
        // =======================


        if (!username || !password) {


            return res.status(400).json({

                success:false,

                message:"Username and password required"

            });


        }



        const cleanUsername =
        username.trim().toLowerCase();





        // =======================
        // FIND ADMIN
        // =======================


        const admin =
        await Admin.findOne({

            username:cleanUsername

        });




        if(!admin){


            return res.status(401).json({

                success:false,

                message:"Invalid username or password"

            });


        }





        // =======================
        // PASSWORD VERIFY
        // =======================


        const passwordMatch =
        await bcrypt.compare(

            password,

            admin.password

        );




        if(!passwordMatch){


            return res.status(401).json({

                success:false,

                message:"Invalid username or password"

            });


        }








        // =======================
        // JWT CHECK
        // =======================


        if(!process.env.JWT_SECRET){


            console.log(
                "JWT_SECRET missing"
            );


            return res.status(500).json({

                success:false,

                message:"Server configuration error"

            });


        }








        // =======================
        // CREATE TOKEN
        // =======================


        const user = {


            id:admin._id,


            username:admin.username,


            role:admin.role || "admin"


        };




        const token =

        jwt.sign(

            user,

            process.env.JWT_SECRET,

            {

                expiresIn:"7d"

            }

        );








        // =======================
        // RESPONSE
        // =======================


        return res.status(200).json({

            success:true,

            message:"Login successful",

            token,


            user


        });



    }

    catch(error){


        console.log(

            "LOGIN ERROR:",

            error.message

        );



        return res.status(500).json({

            success:false,

            message:"Internal server error"

        });


    }


};