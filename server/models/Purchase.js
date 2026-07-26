import mongoose from "mongoose";


const purchaseSchema = new mongoose.Schema(

{

supplierName:{


type:String,

required:true


},



items:[


{

product:{


type:mongoose.Schema.Types.ObjectId,

ref:"Product",

required:true


},



productName:String,



quantity:{


type:Number,

required:true


},



purchasePrice:{


type:Number,

required:true


},



minimumStock:{


type:Number,

default:5


},



expiryDate:{


type:Date,

default:null


},



total:Number


}


],





totalAmount:{


type:Number,

default:0


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

"Purchase",

purchaseSchema

);