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

required:false

},



productName:{

type:String,

required:true

},



category:{

type:String,

default:""

},



brand:{

type:String,

default:""

},



quantity:{

type:Number,

required:true

},



purchasePrice:{

type:Number,

required:true

},



sellingPrice:{

type:Number,

default:0

},



gst:{

type:Number,

default:0

},



minimumStock:{

type:Number,

default:5

},



unit:{

type:String,

default:"packet"

},



expiryDate:{

type:Date,

default:null

},



total:{

type:Number,

default:0

}


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