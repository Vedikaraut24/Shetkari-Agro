import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";



// LOGIN

export const login = async(req,res)=>{

    try{


        const {
            username,
            password
        } = req.body;

        console.log("Database:", User.db.name);

console.log("Collection:", User.collection.name);


const allUsers = await User.find();

console.log("All users:", allUsers);

        const user =
        await User.findOne({
            username
        });



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        const match =
        await bcrypt.compare(
            password,
            user.password
        );



        if(!match){

            return res.status(401).json({

                message:"Invalid password"

            });

        }



        const token =
        generateToken(
            user._id,
            user.role
        );



        res.json({

            message:"Login successful",

            token,

            user:{
                id:user._id,
                username:user.username,
                name:user.name,
                role:user.role
            }

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};






// CREATE USER

export const createUser = async(req,res)=>{


    try{


        const {
            username,
            password,
            name,
            role
        } = req.body;




        const exists =
        await User.findOne({
            username
        });



        if(exists){

            return res.status(400).json({

                message:"User already exists"

            });

        }




        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );




        const user =
        await User.create({

            username,

            password:hashedPassword,

            name,

            role

        });




        res.status(201).json({

            message:"User created",

            user

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};