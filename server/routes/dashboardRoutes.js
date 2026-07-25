import express from "express";

import {
    getDashboard
} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();



// Get dashboard data
// Protected route - Admin only

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getDashboard
);



export default router;