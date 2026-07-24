import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(

{

bill:{
type:mongoose.Schema.Types.ObjectId,
ref:"Bill",
required:true
},


customer:{
type:mongoose.Schema.Types.ObjectId,
ref:"Customer"
},


amount:{
type:Number,
required:true
},


type:{

type:String,

enum:[
"Sale",
"Purchase"
],

default:"Sale"

},


paymentStatus:{

type:String,

default:"Paid"

}

},

{
timestamps:true
}

);



export default mongoose.model(
"Transaction",
transactionSchema
);