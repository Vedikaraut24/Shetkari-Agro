import express from "express";

import {
    getReports
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();



router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getReports
);



export default router;