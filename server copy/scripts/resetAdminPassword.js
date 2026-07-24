import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();


const userSchema = new mongoose.Schema({

    username:String,

    password:String,

    name:String,

    role:String

});


const Admin = mongoose.model(
    "Admin",
    userSchema,
    "admins"
);



await mongoose.connect(
    process.env.MONGO_URI
);



const hashedPassword = await bcrypt.hash(
    "123456",
    10
);



const result = await Admin.updateOne(

    {
        username:"admin"
    },

    {
        $set:{
            password:hashedPassword
        }
    }

);



console.log(result);


console.log("Password reset completed");


await mongoose.disconnect();