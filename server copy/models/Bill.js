import mongoose from "mongoose";



const billSchema = new mongoose.Schema(

{

customer:{
type:mongoose.Schema.Types.ObjectId,
ref:"Customer",
required:true
},



items:[

{

product:{
type:mongoose.Schema.Types.ObjectId,
ref:"Product",
required:true
},


productName:{
type:String,
required:true
},


quantity:{
type:Number,
required:true
},


price:{
type:Number,
required:true
},


gst:{
type:Number,
default:0
},


total:{
type:Number,
required:true
}

}

],





subTotal:{
type:Number,
required:true
},



gstAmount:{
type:Number,
default:0
},



grandTotal:{
type:Number,
required:true
},




paymentStatus:{

type:String,

enum:[
"Paid",
"Pending"
],

default:"Paid"

}



},

{
timestamps:true
}


);



export default mongoose.model(
"Bill",
billSchema
);