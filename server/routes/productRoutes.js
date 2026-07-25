import express from "express";


import {

    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts,
    importProducts

} from "../controllers/productController.js";



import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();




// ===============================
// AUTH REQUIRED
// ===============================

router.use(authMiddleware);





// ===============================
// GET ALL PRODUCTS
// ===============================

router.get(

    "/",

    getProducts

);





// ===============================
// SEARCH PRODUCT
// ===============================

router.get(

    "/search",

    searchProducts

);






// ===============================
// GET SINGLE PRODUCT
// ===============================

router.get(

    "/:id",

    getProductById

);






// ===============================
// CREATE PRODUCT
// ===============================

router.post(

    "/",

    createProduct

);






// ===============================
// UPDATE PRODUCT
// ===============================

router.put(

    "/:id",

    updateProduct

);







// ===============================
// DELETE PRODUCT
// ===============================

router.delete(

    "/:id",

    deleteProduct

);







// ===============================
// IMPORT PRODUCTS
// ===============================

router.post(

    "/import",

    importProducts

);






export default router;