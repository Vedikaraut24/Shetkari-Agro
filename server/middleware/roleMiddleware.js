const roleMiddleware = (...roles) => {


    return (req, res, next) => {


        try {


            // Check user authentication

            if (!req.user) {

                return res.status(401).json({

                    success:false,

                    message:"User not authenticated"

                });

            }




            // Check user role

            if (!roles.includes(req.user.role)) {


                return res.status(403).json({

                    success:false,

                    message:"Access denied"

                });

            }




            next();


        } 
        
        catch(error) {


            console.log(
                "Role Middleware Error:",
                error
            );


            return res.status(500).json({

                success:false,

                message:"Authorization error"

            });


        }


    };


};



export default roleMiddleware;