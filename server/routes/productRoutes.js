import express from "express";

import {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct,
searchProducts
}
from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();


router.use(
    authMiddleware,
    roleMiddleware("admin")
);


router.post(
    "/",
    createProduct
);


router.get(
    "/",
    getProducts
);


router.get(
    "/search",
    searchProducts
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