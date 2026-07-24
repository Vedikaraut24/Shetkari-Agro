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
import settingsRoutes from "./routes/settingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";   // ✅ NEW

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(helmet());

app.use(morgan("dev"));

// =====================
// Database Connection
// =====================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((error) => {

        console.log("MongoDB Connection Error");
        console.log(error);

    });

// =====================
// API Routes
// =====================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/bills", billRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ✅ Reports Route
app.use("/api/reports", reportRoutes);

app.use("/api/settings", settingsRoutes);

// =====================
// Test Route
// =====================

app.get("/", (req, res) => {

    res.json({

        message: "Shetkari Agro API Running"

    });

});

// =====================
// Error Handler
// =====================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        message: "Server Error",

        error: err.message

    });

});

// =====================
// Server Start
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});