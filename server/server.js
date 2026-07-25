import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";



dotenv.config();



const app = express();



// =======================
// CORS
// =======================


const allowedOrigins=[


    "http://localhost:5173",


    "https://shetkari-agro-5vhb-lqo00nje4-vedika9.vercel.app"


];



app.use(cors({

    origin:function(origin,callback){


        if(!origin){

            return callback(null,true);

        }



        if(allowedOrigins.includes(origin)){


            return callback(null,true);


        }


        return callback(
            new Error("Not allowed by CORS")
        );


    },

    credentials:true

}));





app.use(express.json());

app.use(express.urlencoded({

    extended:true

}));



app.use(helmet());

app.use(morgan("dev"));





// =======================
// DATABASE
// =======================


mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log("MongoDB Connected");

})

.catch((error)=>{

console.log(
"MongoDB Error",
error
);

});







// =======================
// ROUTES
// =======================


app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/products",
productRoutes
);


app.use(
"/api/categories",
categoryRoutes
);


app.use(
"/api/customers",
customerRoutes
);


app.use(
"/api/bills",
billRoutes
);


app.use(
"/api/dashboard",
dashboardRoutes
);


app.use(
"/api/transactions",
transactionRoutes
);





app.get("/",(req,res)=>{


res.json({

message:"Shetkari Agro API Running"

});


});





// error handler

app.use((err,req,res,next)=>{


console.log(err);


res.status(500).json({

message:
err.message ||
"Server Error"

});


});





const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{


console.log(

`Server running on ${PORT}`

);


});