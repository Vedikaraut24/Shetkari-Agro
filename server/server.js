import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


// =====================
// Routes
// =====================

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



// =====================
// Environment
// =====================

dotenv.config();


const app = express();



// =====================
// CORS
// =====================

app.use(

    cors({

        origin:true,

        credentials:true,

        methods:[

            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"

        ],

        allowedHeaders:[

            "Content-Type",
            "Authorization"

        ]

    })

);




// =====================
// Middleware
// =====================

app.use(
    helmet()
);


app.use(
    morgan("dev")
);


app.use(
    express.json()
);




// =====================
// Routes
// =====================


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
    "/api/reports",
    reportRoutes
);


app.use(
    "/api/dashboard",
    dashboardRoutes
);





// =====================
// Test Route
// =====================

app.get(

    "/",

    (req,res)=>{


        res.status(200).json({

            success:true,

            message:
            "Shetkari Agro API Running Successfully"

        });


    }

);





// =====================
// Error Handler
// =====================


app.use(

    (err,req,res,next)=>{


        console.log(
            err.message
        );


        res.status(500).json({

            success:false,

            message:
            err.message

        });


    }

);







// =====================
// MongoDB Connection
// =====================


const PORT =
process.env.PORT || 5000;



mongoose.connect(

    process.env.MONGO_URI

)

.then(()=>{


    console.log(
        "MongoDB Connected"
    );


    app.listen(

        PORT,

        ()=>{


            console.log(

                `Server running on port ${PORT}`

            );


        }

    );


})


.catch((error)=>{


    console.log(

        "MongoDB Error:",
        error.message

    );


});