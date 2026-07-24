import express from "express";

import {

getCustomers,
createCustomer,
updateCustomer,
deleteCustomer,
searchCustomers

}
from "../controllers/customerController.js";


const router = express.Router();



// Search customer
router.get(

"/search",

searchCustomers

);



// Get all

router.get(

"/",

getCustomers

);



// Create

router.post(

"/",

createCustomer

);



// Update

router.put(

"/:id",

updateCustomer

);



// Delete

router.delete(

"/:id",

deleteCustomer

);



export default router;