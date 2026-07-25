import Product from "../models/Product.js";
import Category from "../models/Category.js";

import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";



// ===============================
// CREATE PRODUCT
// ===============================

export const createProduct = async(req,res)=>{


    try{


        const productData = {

            productName:req.body.productName,

            category:req.body.category,

            brand:req.body.brand || "",

            purchasePrice:Number(req.body.purchasePrice || 0),

            sellingPrice:Number(req.body.sellingPrice || 0),

            gst:Number(req.body.gst || 0),

            currentStock:Number(req.body.currentStock || 0),

            minimumStock:Number(req.body.minimumStock || 5),

            unit:req.body.unit || "packet",

            expiryDate:req.body.expiryDate || null,

            supplier:req.body.supplier || ""

        };




        // Create category automatically

        if(productData.category){


            const exists =
            await Category.findOne({

                name:productData.category

            });



            if(!exists){

                await Category.create({

                    name:productData.category

                });

            }

        }




        const product =
        await Product.create(productData);



        res.status(201).json({

            success:true,

            message:"Product Added",

            product

        });



    }

    catch(error){


        console.log(
            "Create Product Error:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







// ===============================
// GET PRODUCTS
// ===============================


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








// ===============================
// GET SINGLE PRODUCT
// ===============================


export const getProductById = async(req,res)=>{


    try{


        const product =
        await Product.findById(

            req.params.id

        );



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








// ===============================
// UPDATE PRODUCT
// ===============================


export const updateProduct = async(req,res)=>{


    try{


        const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );



        res.json({

            success:true,

            product

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ===============================
// DELETE PRODUCT
// ===============================


export const deleteProduct = async(req,res)=>{


    try{


        await Product.findByIdAndDelete(

            req.params.id

        );


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








// ===============================
// SEARCH PRODUCT
// ===============================


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








// ===============================
// IMPORT PRODUCTS
// ===============================


export const importProducts = async(req,res)=>{


    try{


        if(!req.file){

            return res.status(400).json({

                message:"No file uploaded"

            });

        }



        let data=[];



        if(req.file.originalname.endsWith(".csv")){


            data =
            await new Promise((resolve,reject)=>{


                const rows=[];



                fs.createReadStream(req.file.path)

                .pipe(csv())

                .on(

                    "data",

                    row=>rows.push(row)

                )

                .on(

                    "end",

                    ()=>resolve(rows)

                )

                .on(

                    "error",

                    reject

                );


            });



        }

        else{


            const workbook =
            XLSX.readFile(

                req.file.path

            );


            const sheet =
            workbook.Sheets[

                workbook.SheetNames[0]

            ];



            data =
            XLSX.utils.sheet_to_json(sheet);


        }




        let count=0;



        for(const item of data){


            await Product.create({

                productName:item.productName,

                category:item.category,

                brand:item.brand || "",

                purchasePrice:Number(item.purchasePrice || 0),

                sellingPrice:Number(item.sellingPrice || 0),

                gst:Number(item.gst || 0),

                currentStock:Number(item.currentStock || 0),

                minimumStock:Number(item.minimumStock || 5),

                unit:item.unit || "packet"

            });



            count++;


        }



        fs.unlinkSync(req.file.path);



        res.json({

            success:true,

            message:"Import completed",

            inserted:count

        });



    }

    catch(error){


        console.log(error);



        res.status(500).json({

            message:error.message

        });


    }


};