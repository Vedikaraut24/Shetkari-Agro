import mongoose from "mongoose";


const settingsSchema = new mongoose.Schema(

{

shopName:{

type:String,

default:"Shetkari Agro"

},


ownerName:{

type:String,

default:"Rushikesh Band"

},


phone:{

type:String,

default:""

},


address:{

type:String,

default:""

},


email:{

type:String,

default:""

}

},

{

timestamps:true

}

);



export default mongoose.model(

"Settings",

settingsSchema

);