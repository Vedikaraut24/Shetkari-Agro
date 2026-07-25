import express from "express";


import {

    createBill,
    getBills,
    getBillById,
    deleteBill

} from "../controllers/billController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();




// All billing APIs require login

router.use(authMiddleware);




// CREATE BILL

router.post(

    "/",

    createBill

);




// GET ALL BILLS

router.get(

    "/",

    getBills

);




// GET SINGLE BILL

router.get(

    "/:id",

    getBillById

);




// DELETE BILL

router.delete(

    "/:id",

    deleteBill

);



export default router;