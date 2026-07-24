import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
{

    username:{
        type:String
    },

    password:{
        type:String
    },

    name:{
        type:String
    },

    role:{
        type:String
    }

},
{
    timestamps:true
}

);



const User = mongoose.model(
    "User",
    userSchema,
    "admins"
);


export default User;