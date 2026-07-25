import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


// Routes

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



dotenv.config();



const app = express();




// ===============================
// CORS FIX
// ===============================


const allowedOrigins = [

    "http://localhost:5173",

    "http://localhost:3000",

    "https://shetkari-agro.vercel.app"

];




const corsOptions = {


    origin:(origin,callback)=>{


        // Allow requests without origin
        // (Postman, mobile apps)

        if(!origin){

            return callback(null,true);

        }



        // Allow all Vercel deployments

        if(

            origin.endsWith(".vercel.app")

            ||

            allowedOrigins.includes(origin)

        ){

            return callback(null,true);

        }



        console.log(
            "Blocked CORS:",
            origin
        );


        return callback(null,false);


    },


    methods:[

        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS"

    ],


    allowedHeaders:[

        "Content-Type",
        "Authorization"

    ],


    credentials:true


};





app.use(cors(corsOptions));



// Express 5 compatible OPTIONS

app.options(
    "/{*any}",
    cors(corsOptions)
);






// ===============================
// MIDDLEWARE
// ===============================


app.use(
    express.json()
);


app.use(
    express.urlencoded({

        extended:true

    })
);



app.use(
    helmet()
);



app.use(
    morgan("dev")
);







// ===============================
// TEST ROUTE
// ===============================


app.get("/",(req,res)=>{


    res.json({

        success:true,

        message:
        "Shetkari Agro API Running"

    });


});







// ===============================
// API ROUTES
// ===============================



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

    "/api/transactions",

    transactionRoutes

);



app.use(

    "/api/dashboard",

    dashboardRoutes

);







// ===============================
// DATABASE CONNECTION
// ===============================



mongoose.connect(

    process.env.MONGO_URI

)

.then(()=>{


    console.log(
        "MongoDB Connected"
    );


})

.catch((error)=>{


    console.log(

        "MongoDB Error:",
        error.message

    );


});







// ===============================
// SERVER START
// ===============================



const PORT =
process.env.PORT || 5000;




app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT}`

);


}

);