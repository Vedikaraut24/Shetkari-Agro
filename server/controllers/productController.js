import Product from "../models/Product.js";
import Category from "../models/Category.js";


// CREATE PRODUCT

export const createProduct = async(req,res)=>{

    try{


        console.log("Received Product Data:");
        console.log(req.body);



        const {

            productName,
            category,
            brand,
            purchasePrice,
            sellingPrice,
            gst,
            currentStock,
            minimumStock,
            unit,
            expiryDate,
            supplier

        } = req.body;




        // create category automatically

        if(category){


            const categoryExists =
            await Category.findOne({

                name:category

            });



            if(!categoryExists){

                await Category.create({

                    name:category

                });

            }


        }





        const product =
        await Product.create({

            productName,

            category,

            brand,

            purchasePrice:Number(purchasePrice),

            sellingPrice:Number(sellingPrice),

            gst:Number(gst || 0),

            currentStock:Number(currentStock || 0),

            minimumStock:Number(minimumStock || 5),

            unit:unit || "packet",

            expiryDate,

            supplier


        });





        res.status(201).json({

            success:true,

            message:"Product Added Successfully",

            product


        });



    }

    catch(error){


        console.log(
            "PRODUCT ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






// GET PRODUCTS

export const getProducts = async(req,res)=>{


    try{


        const products =
        await Product.find()

        .sort({

            createdAt:-1

        });



        res.json(products);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// UPDATE PRODUCT

export const updateProduct = async(req,res)=>{


    try{


        const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );


        res.json(product);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// DELETE PRODUCT


export const deleteProduct = async(req,res)=>{


    try{


        await Product.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"Deleted"

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};