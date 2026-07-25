import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(

    {

        name:{

            type:String,

            required:true,

            unique:true,

            trim:true,

            minlength:2,

            maxlength:50

        }

    },

    {

        timestamps:true

    }

);



// Prevent duplicate model error in development

export default mongoose.models.Category ||

mongoose.model(

    "Category",

    categorySchema

);