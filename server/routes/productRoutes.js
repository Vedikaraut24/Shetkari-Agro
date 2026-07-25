import express from "express";


import {

createProduct,
getProducts,
updateProduct,
deleteProduct,
getProductById,
searchProducts,
importProducts

}

from "../controllers/productController.js";


import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";



const router = express.Router();



router.use(authMiddleware);



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



router.post(
"/",
roleMiddleware("admin"),
createProduct
);



router.put(
"/:id",
roleMiddleware("admin"),
updateProduct
);



router.delete(
"/:id",
roleMiddleware("admin"),
deleteProduct
);



router.post(
"/import",
roleMiddleware("admin"),
importProducts
);



export default router;