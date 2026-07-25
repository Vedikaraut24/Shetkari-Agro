import Product from "../models/Product.js";
import Category from "../models/Category.js";




// ============================
// CREATE PRODUCT
// ============================

export const createProduct = async(req,res)=>{


    try{


        console.log(
            "USER:",
            req.user
        );


        console.log(
            "PRODUCT DATA:",
            req.body
        );



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





        if(!productName || !category){


            return res.status(400).json({

                success:false,

                message:
                "Product name and category required"

            });


        }







        // Auto create category

        const categoryExists =
        await Category.findOne({

            name:category

        });




        if(!categoryExists){


            await Category.create({

                name:category

            });


        }







        const product =
        await Product.create({


            productName,


            category,


            brand:brand || "",


            purchasePrice:
            Number(purchasePrice),


            sellingPrice:
            Number(sellingPrice),


            gst:
            Number(gst || 0),


            currentStock:
            Number(currentStock || 0),


            minimumStock:
            Number(minimumStock || 5),


            unit:
            unit || "packet",


            expiryDate:
            expiryDate || null,


            supplier:
            supplier || ""


        });






        return res.status(201).json({


            success:true,


            message:
            "Product Added Successfully",


            product


        });



    }

    catch(error){



        console.log(
            "CREATE PRODUCT ERROR:",
            error.message
        );



        return res.status(500).json({

            success:false,

            message:error.message

        });



    }



};







// ============================
// GET ALL PRODUCTS
// ============================

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

            success:false,

            message:error.message

        });


    }


};








// ============================
// GET PRODUCT BY ID
// ============================

export const getProductById = async(req,res)=>{


    try{


        const product =
        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:
                "Product not found"

            });


        }





        res.json(product);



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ============================
// UPDATE PRODUCT
// ============================

export const updateProduct = async(req,res)=>{


    try{


        const product =
        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:
                "Product not found"

            });


        }






        const updated =
        await Product.findByIdAndUpdate(


            req.params.id,


            {


                ...req.body,


                purchasePrice:
                Number(req.body.purchasePrice),


                sellingPrice:
                Number(req.body.sellingPrice),


                gst:
                Number(req.body.gst || 0),


                currentStock:
                Number(req.body.currentStock || 0),


                minimumStock:
                Number(req.body.minimumStock || 5)



            },


            {


                new:true,


                runValidators:true


            }


        );







        res.json({


            success:true,


            message:
            "Product Updated",


            product:updated



        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ============================
// DELETE PRODUCT
// ============================

export const deleteProduct = async(req,res)=>{


    try{


        const product =
        await Product.findByIdAndDelete(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:
                "Product not found"

            });


        }






        res.json({


            success:true,


            message:
            "Product deleted"



        });




    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







// ============================
// SEARCH PRODUCTS
// ============================

export const searchProducts = async(req,res)=>{


    try{


        const keyword =
        req.query.keyword || "";



        const products =
        await Product.find({

            $or:[


                {

                    productName:{

                        $regex:keyword,

                        $options:"i"

                    }

                },


                {

                    category:{

                        $regex:keyword,

                        $options:"i"

                    }

                },


                {

                    brand:{

                        $regex:keyword,

                        $options:"i"

                    }

                }


            ]


        });




        res.json(products);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ============================
// IMPORT PLACEHOLDER
// ============================

export const importProducts = async(req,res)=>{


    return res.status(501).json({

        success:false,

        message:
        "Import feature not enabled"

    });


};