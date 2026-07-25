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

        required:true,

        trim:true

    },


    brand:{

        type:String,

        default:""

    },


    purchasePrice:{

        type:Number,

        required:true,

        min:0

    },


    sellingPrice:{

        type:Number,

        required:true,

        min:0

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

        enum:[

            "kg",

            "litre",

            "bag",

            "bottle",

            "packet"

        ],

        default:"packet"

    },


    expiryDate:{

        type:Date,

        default:null

    },


    supplier:{

        type:String,

        default:""

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