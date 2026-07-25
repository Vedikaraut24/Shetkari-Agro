import mongoose from "mongoose";


const adminSchema = new mongoose.Schema(

{
    username: {

        type:String,

        required:true,

        unique:true,

        trim:true,

        lowercase:true

    },


    password: {

        type:String,

        required:true

    },


    name: {

        type:String,

        default:"रुषिकेश बंड"

    },


    role: {

        type:String,

        enum:[

            "admin",

            "staff"

        ],

        default:"admin"

    }

},

{
    timestamps:true
}

);



export default mongoose.model(

    "Admin",

    adminSchema

);