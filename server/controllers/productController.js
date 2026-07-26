import Product from "../models/Product.js";



// =====================================
// GET ALL PRODUCTS
// =====================================

export const getProducts = async(req,res)=>{

    try{

        const products = await Product.find()

        .populate("category")

        .sort({
            createdAt:-1
        });


        res.status(200).json(products);


    }
    catch(error){

        console.log(
            "GET PRODUCTS ERROR:",
            error.message
        );


        res.status(500).json({

            message:error.message

        });

    }

};





// =====================================
// GET PRODUCT BY ID
// =====================================

export const getProductById = async(req,res)=>{


    try{


        const product = await Product.findById(

            req.params.id

        )

        .populate("category");



        if(!product){

            return res.status(404).json({

                message:"Product not found"

            });

        }



        res.json(product);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// =====================================
// CREATE PRODUCT
// =====================================

export const createProduct = async(req,res)=>{


    try{


        const product = await Product.create(

            req.body

        );



        res.status(201).json({

            success:true,

            message:"Product added successfully",

            product

        });



    }
    catch(error){


        console.log(
            "CREATE PRODUCT ERROR:",
            error.message
        );


        res.status(500).json({

            message:error.message

        });


    }


};








// =====================================
// UPDATE PRODUCT
// =====================================

export const updateProduct = async(req,res)=>{


    try{


        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );



        if(!product){


            return res.status(404).json({

                message:"Product not found"

            });


        }



        res.json({

            success:true,

            message:"Product updated",

            product

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// =====================================
// DELETE PRODUCT
// =====================================

export const deleteProduct = async(req,res)=>{


    try{


        const product = await Product.findByIdAndDelete(

            req.params.id

        );



        if(!product){


            return res.status(404).json({

                message:"Product not found"

            });


        }



        res.json({

            success:true,

            message:"Product deleted"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// =====================================
// SEARCH PRODUCT
// Billing autocomplete
// =====================================

export const searchProducts = async(req,res)=>{


    try{


        const keyword = req.query.keyword || "";



        const products = await Product.find({

            productName:{

                $regex:keyword,

                $options:"i"

            }


        })

        .limit(10);



        res.json(products);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// =====================================
// IMPORT PRODUCTS CSV
// =====================================

export const importProducts = async(req,res)=>{


    try{


        const products = req.body.products;



        if(

            !products ||

            products.length===0

        ){

            return res.status(400).json({

                message:"No products received"

            });


        }




        const savedProducts = await Product.insertMany(

            products

        );




        res.status(201).json({


            success:true,


            message:
            "CSV products imported successfully",


            count:
            savedProducts.length


        });



    }
    catch(error){



        console.log(

            "CSV IMPORT ERROR:",

            error.message

        );



        res.status(500).json({

            message:error.message

        });


    }


};