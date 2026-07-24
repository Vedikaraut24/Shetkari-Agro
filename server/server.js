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
import transactionRoutes from "./routes/transactionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



dotenv.config();


const app = express();



// =====================
// CORS FIX
// =====================

app.use(
    cors({
        origin:"*",
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



app.use(
    helmet({
        crossOriginResourcePolicy:false
    })
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


app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/bills", billRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/dashboard", dashboardRoutes);




// =====================
// Test
// =====================

app.get("/",(req,res)=>{

    res.json({

        status:"success",

        message:"Shetkari Agro API Working"

    });

});




// =====================
// Server
// =====================


const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI)

.then(()=>{


    console.log("MongoDB Connected");


    app.listen(PORT,()=>{

        console.log(
            `Server running on port ${PORT}`
        );

    });


})

.catch((err)=>{

    console.log(
        "MongoDB Error",
        err
    );

});