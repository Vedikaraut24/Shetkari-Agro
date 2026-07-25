import jwt from "jsonwebtoken";



const authMiddleware = (req,res,next)=>{


    try{


        const authHeader =
        req.headers.authorization;



        // ===============================
        // CHECK TOKEN HEADER
        // ===============================


        if(!authHeader){


            return res.status(401).json({

                success:false,

                message:"Authentication required"

            });


        }






        const parts =
        authHeader.trim().split(/\s+/);





        if(

            parts.length !== 2 ||

            parts[0].toLowerCase() !== "bearer"

        ){


            return res.status(401).json({

                success:false,

                message:"Invalid token format"

            });


        }





        const token =
        parts[1];






        if(!process.env.JWT_SECRET){


            console.log(
                "JWT_SECRET missing"
            );


            return res.status(500).json({

                success:false,

                message:"Server configuration error"

            });


        }








        // ===============================
        // VERIFY TOKEN
        // ===============================


        const decoded =

        jwt.verify(

            token,

            process.env.JWT_SECRET

        );






        if(!decoded?.id){


            return res.status(401).json({

                success:false,

                message:"Invalid session"

            });


        }







        // ===============================
        // ATTACH USER
        // ===============================


        req.user = {


            id:decoded.id,


            username:decoded.username,


            role:decoded.role || "admin"


        };





        next();





    }

    catch(error){



        console.log(

            "AUTH ERROR:",

            error.message

        );



        return res.status(401).json({

            success:false,

            message:"Session expired. Login again."

        });



    }


};



export default authMiddleware;