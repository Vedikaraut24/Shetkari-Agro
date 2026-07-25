import express from "express";

import {

createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct,
searchProducts

} from "../controllers/productController.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();



router.post(
    "/",
    authMiddleware,
    createProduct
);



router.get(
    "/",
    authMiddleware,
    getProducts
);



router.get(
    "/search",
    authMiddleware,
    searchProducts
);



router.get(
    "/:id",
    authMiddleware,
    getProductById
);



router.put(
    "/:id",
    authMiddleware,
    updateProduct
);



router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);



export default router;