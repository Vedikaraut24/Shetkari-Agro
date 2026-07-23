import express from "express";


import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    importProducts
}
from "../controllers/productController.js";


import upload from "../middleware/upload.js";


const router = express.Router();



console.log("Product routes loaded");



// CSV IMPORT

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




// CRUD

router.post(
"/",
createProduct
);



router.get(
"/",
getProducts
);



router.get(
"/:id",
getProductById
);



router.put(
"/:id",
updateProduct
);



router.delete(
"/:id",
deleteProduct
);



export default router;