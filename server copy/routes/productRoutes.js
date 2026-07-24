import express from "express";


import {

    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    importProducts,
    searchProducts

}
from "../controllers/productController.js";


import upload from "../middleware/upload.js";


const router = express.Router();



console.log("Product routes loaded");



// =====================
// CSV / EXCEL IMPORT
// =====================


router.post(

    "/import",

    upload.single("file"),

    (req,res,next)=>{

        console.log("IMPORT REQUEST RECEIVED");

        console.log(req.file);

        next();

    },

    importProducts

);




// =====================
// SEARCH PRODUCT
// MUST BE ABOVE /:id
// =====================


router.get(

    "/search",

    searchProducts

);





// =====================
// CREATE PRODUCT
// =====================


router.post(

    "/",

    createProduct

);





// =====================
// GET ALL PRODUCTS
// =====================


router.get(

    "/",

    getProducts

);





// =====================
// GET SINGLE PRODUCT
// =====================


router.get(

    "/:id",

    getProductById

);





// =====================
// UPDATE PRODUCT
// =====================


router.put(

    "/:id",

    updateProduct

);





// =====================
// DELETE PRODUCT
// =====================


router.delete(

    "/:id",

    deleteProduct

);



export default router;