import express from "express";

import { getReports } from "../controllers/reportController.js";

const router = express.Router();

// GET REPORTS
router.get("/", getReports);

export default router;