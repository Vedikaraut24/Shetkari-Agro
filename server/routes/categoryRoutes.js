import express from "express";


import {

    getCategories,
    createCategory,
    updateCategory,
    deleteCategory

} from "../controllers/categoryController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();



// ===============================
// ALL CATEGORY APIs REQUIRE LOGIN
// ===============================

router.use(authMiddleware);





// ===============================
// GET ALL CATEGORIES
// ===============================

router.get(

    "/",

    getCategories

);





// ===============================
// CREATE CATEGORY
// ===============================

router.post(

    "/",

    createCategory

);






// ===============================
// UPDATE CATEGORY
// ===============================

router.put(

    "/:id",

    updateCategory

);






// ===============================
// DELETE CATEGORY
// ===============================

router.delete(

    "/:id",

    deleteCategory

);





export default router;