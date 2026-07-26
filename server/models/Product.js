import mongoose from "mongoose";


const productSchema = new mongoose.Schema(

{

productName:{

type:String,

required:true,

trim:true

},


category:{

type:String,

required:true

},


brand:{

type:String,

default:""

},



purchasePrice:{

type:Number,

required:true

},



sellingPrice:{

type:Number,

required:true

},



gst:{

type:Number,

default:0

},



currentStock:{

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

}


},

{

timestamps:true

}


);



export default mongoose.model(

"Product",

productSchema

);