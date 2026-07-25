import express from "express";

import {
    login
} from "../controllers/authController.js";


const router = express.Router();



// ===============================
// AUTH HEALTH CHECK
// ===============================

router.get(
    "/",
    (req,res)=>{

        res.json({

            success:true,

            message:"Auth API Running"

        });

    }
);




// ===============================
// ADMIN LOGIN
// ===============================

router.post(

    "/login",

    login

);



export default router;