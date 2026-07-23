import mongoose from "mongoose";


const customerSchema = new mongoose.Schema(

{

name:{
type:String,
required:true
},


phone:{
type:String,
default:""
},


address:{
type:String,
default:""
}

},

{
timestamps:true
}

);


export default mongoose.model(
"Customer",
customerSchema
);