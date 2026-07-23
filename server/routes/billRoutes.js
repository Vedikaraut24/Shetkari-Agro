import express from "express";

import {
    createBill,
    getBills,
    getBillById,
    deleteBill
} from "../controllers/billController.js";

const router = express.Router();

router.post("/", createBill);

router.get("/", getBills);

router.get("/:id", getBillById);

router.delete("/:id", deleteBill);

export default router;