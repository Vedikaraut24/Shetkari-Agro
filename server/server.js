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
// CORS CONFIGURATION
// ===============================


app.use(

    cors({

        origin: true,

        credentials: true,

        methods: [

            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH",
            "OPTIONS"

        ],

        allowedHeaders: [

            "Content-Type",
            "Authorization"

        ]

    })

);




// ===============================
// BODY PARSER
// ===============================


app.use(
    express.json()
);


app.use(
    express.urlencoded({

        extended:true

    })
);





// ===============================
// SECURITY + LOGGING
// ===============================


app.use(
    helmet()
);


app.use(
    morgan("dev")
);






// ===============================
// HEALTH CHECK
// ===============================


app.get("/",(req,res)=>{


    res.status(200).json({

        success:true,

        message:"Shetkari Agro API Running"

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
// ERROR HANDLER
// ===============================


app.use((err,req,res,next)=>{


    console.log(
        "SERVER ERROR:",
        err.message
    );


    res.status(500).json({

        success:false,

        message:err.message

    });


});








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