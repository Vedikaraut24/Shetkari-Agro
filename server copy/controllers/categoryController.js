import Category from "../models/Category.js";


// ===============================
// GET ALL CATEGORIES
// ===============================

export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find()
            .sort({
                createdAt: -1
            });


        res.status(200).json(categories);


    } catch (error) {

        console.error("GET CATEGORIES ERROR:");
        console.error(error);


        res.status(500).json({

            message: error.message

        });

    }

};




// ===============================
// CREATE CATEGORY
// ===============================

export const createCategory = async (req, res) => {

    try {


        console.log("CATEGORY REQUEST BODY:");
        console.log(req.body);



        const {
            name,
            description
        } = req.body;



        if (!name || name.trim() === "") {

            return res.status(400).json({

                message: "Category name is required"

            });

        }



        const existingCategory = await Category.findOne({

            name: name.trim()

        });



        if (existingCategory) {

            return res.status(400).json({

                message: "Category already exists"

            });

        }



        const category = await Category.create({

            name: name.trim(),

            description: description || ""

        });



        console.log("CATEGORY CREATED:");
        console.log(category);



        res.status(201).json({

            success: true,

            message: "Category created successfully",

            category

        });



    } catch (error) {


        console.error("CREATE CATEGORY ERROR:");
        console.error(error);



        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};




// ===============================
// UPDATE CATEGORY
// ===============================

export const updateCategory = async (req, res) => {

    try {


        const category = await Category.findByIdAndUpdate(

            req.params.id,

            {

                name:req.body.name,

                description:req.body.description || ""

            },

            {

                new:true,

                runValidators:true

            }

        );



        if (!category) {

            return res.status(404).json({

                message:"Category not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Category updated successfully",

            category

        });



    } catch(error) {


        console.error("UPDATE CATEGORY ERROR:");
        console.error(error);



        res.status(500).json({

            message:error.message

        });


    }

};




// ===============================
// DELETE CATEGORY
// ===============================

export const deleteCategory = async (req,res)=>{

    try {


        const category = await Category.findByIdAndDelete(

            req.params.id

        );



        if(!category){

            return res.status(404).json({

                message:"Category not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Category deleted successfully"

        });



    } catch(error){


        console.error("DELETE CATEGORY ERROR:");
        console.error(error);



        res.status(500).json({

            message:error.message

        });


    }

};