import express from "express";

import {

    createProduct,
    getProducts,
    getProductById,
    searchProducts,
    updateProduct,
    deleteProduct

} from "../controllers/productController.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();



router.use(authMiddleware);



// IMPORTANT: search comes before /:id

router.get(
    "/search",
    searchProducts
);



router.get(
    "/",
    getProducts
);



router.get(
    "/:id",
    getProductById
);



router.post(
    "/",
    createProduct
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