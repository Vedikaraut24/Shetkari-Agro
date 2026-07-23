import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();


// ==============================
// Security Middleware
// ==============================

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));


// ==============================
// Static Upload Folder
// ==============================

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);


// ==============================
// Rate Limiter
// ==============================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
});

app.use(limiter);


// ==============================
// MongoDB Connection
// ==============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });


// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.send("🌾 Shetkari Agro Backend Running...");
});


// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);


// ==============================
// 404
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});


// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});