import Category from "../models/Category.js";



// ===============================
// GET ALL CATEGORIES
// ===============================

export const getCategories = async(req,res)=>{


    try{


        const categories = await Category.find()

        .sort({

            name:1

        });



        res.status(200).json(categories);



    }

    catch(error){


        console.log(

            "GET CATEGORY ERROR:",

            error.message

        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







// ===============================
// CREATE CATEGORY
// ===============================

export const createCategory = async(req,res)=>{


    try{


        const {

            name

        } = req.body;





        if(!name || !name.trim()){


            return res.status(400).json({

                success:false,

                message:"Category name required"

            });


        }






        const cleanName =
        name.trim();





        const exists =
        await Category.findOne({

            name:cleanName

        });





        if(exists){


            return res.status(400).json({

                success:false,

                message:"Category already exists"

            });


        }





        const category =

        await Category.create({

            name:cleanName

        });






        res.status(201).json({

            success:true,

            message:"Category created",

            category

        });





    }

    catch(error){


        console.log(

            "CREATE CATEGORY ERROR:",

            error.message

        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ===============================
// UPDATE CATEGORY
// ===============================


export const updateCategory = async(req,res)=>{


    try{


        const {

            name

        } = req.body;




        if(!name || !name.trim()){


            return res.status(400).json({

                success:false,

                message:"Category name required"

            });


        }






        const category =

        await Category.findByIdAndUpdate(


            req.params.id,


            {

                name:name.trim()

            },


            {

                new:true,

                runValidators:true

            }


        );







        if(!category){


            return res.status(404).json({

                success:false,

                message:"Category not found"

            });


        }






        res.json({

            success:true,

            message:"Category updated",

            category

        });





    }

    catch(error){


        console.log(

            "UPDATE CATEGORY ERROR:",

            error.message

        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ===============================
// DELETE CATEGORY
// ===============================


export const deleteCategory = async(req,res)=>{


    try{


        const category =

        await Category.findByIdAndDelete(

            req.params.id

        );





        if(!category){


            return res.status(404).json({

                success:false,

                message:"Category not found"

            });


        }





        res.json({

            success:true,

            message:"Category deleted"

        });





    }

    catch(error){


        console.log(

            "DELETE CATEGORY ERROR:",

            error.message

        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};