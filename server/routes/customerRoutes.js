import express from "express";


import {

    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers

} from "../controllers/customerController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();



router.use(authMiddleware);



// GET ALL CUSTOMERS

router.get(

    "/",

    getCustomers

);



// SEARCH CUSTOMERS

router.get(

    "/search",

    searchCustomers

);



// CREATE CUSTOMER

router.post(

    "/",

    createCustomer

);



// UPDATE CUSTOMER

router.put(

    "/:id",

    updateCustomer

);



// DELETE CUSTOMER

router.delete(

    "/:id",

    deleteCustomer

);



export default router;