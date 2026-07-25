import Product from "../models/Product.js";
import Category from "../models/Category.js";

import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";



// =====================================
// CREATE PRODUCT
// =====================================

export const createProduct = async(req,res)=>{


    try{


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

                message:"Product name and category required"

            });


        }




        // Auto create category

        const categoryExists =
        await Category.findOne({

            name:category.trim()

        });



        if(!categoryExists){


            await Category.create({

                name:category.trim()

            });


        }






        const product =
        await Product.create({


            productName:productName.trim(),

            category:category.trim(),

            brand:brand || "",


            purchasePrice:Number(
                purchasePrice
            ),


            sellingPrice:Number(
                sellingPrice
            ),


            gst:Number(
                gst || 0
            ),


            currentStock:Number(
                currentStock || 0
            ),


            minimumStock:Number(
                minimumStock || 5
            ),


            unit:unit || "packet",


            expiryDate:
            expiryDate || null,


            supplier:
            supplier || ""


        });





        res.status(201).json({

            success:true,

            message:"Product Added Successfully",

            product

        });



    }

    catch(error){


        console.log(
            "CREATE PRODUCT ERROR:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







// =====================================
// GET ALL PRODUCTS
// =====================================


export const getProducts = async(req,res)=>{


    try{


        const products =
        await Product.find()

        .sort({

            createdAt:-1

        });



        res.status(200).json(products);



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =====================================
// SEARCH PRODUCTS FOR BILLING
// =====================================


export const searchProducts = async(req,res)=>{


    try{


        const keyword =
        req.query.keyword || "";



        if(!keyword.trim()){


            return res.json([]);


        }





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

        .limit(10)

        .sort({

            productName:1

        });





        res.status(200).json(products);



    }

    catch(error){


        console.log(
            "SEARCH ERROR:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =====================================
// GET PRODUCT BY ID
// =====================================


export const getProductById = async(req,res)=>{


    try{


        const product =
        await Product.findById(

            req.params.id

        );



        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found"

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









// =====================================
// UPDATE PRODUCT
// =====================================


export const updateProduct = async(req,res)=>{


    try{


        if(req.body.category){


            const exists =
            await Category.findOne({

                name:req.body.category

            });



            if(!exists){


                await Category.create({

                    name:req.body.category

                });


            }


        }





        const product =
        await Product.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true,

                runValidators:true

            }


        );





        if(!product){


            return res.status(404).json({

                success:false,

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

            success:false,

            message:error.message

        });


    }


};









// =====================================
// DELETE PRODUCT
// =====================================


export const deleteProduct = async(req,res)=>{


    try{


        const product =
        await Product.findByIdAndDelete(

            req.params.id

        );



        if(!product){


            return res.status(404).json({

                success:false,

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

            success:false,

            message:error.message

        });


    }


};









// =====================================
// IMPORT CSV / EXCEL
// =====================================


export const importProducts = async(req,res)=>{


    try{


        if(!req.file){


            return res.status(400).json({

                success:false,

                message:"File required"

            });


        }





        let data=[];




        if(req.file.originalname.endsWith(".csv")){


            data =
            await new Promise((resolve,reject)=>{


                const rows=[];


                fs.createReadStream(
                    req.file.path
                )

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


            if(item.category){


                const exists =
                await Category.findOne({

                    name:item.category

                });



                if(!exists){


                    await Category.create({

                        name:item.category

                    });


                }


            }






            await Product.create({

                productName:item.productName,

                category:item.category,

                brand:item.brand || "",

                purchasePrice:Number(
                    item.purchasePrice || 0
                ),

                sellingPrice:Number(
                    item.sellingPrice || 0
                ),

                gst:Number(
                    item.gst || 0
                ),

                currentStock:Number(
                    item.currentStock || 0
                ),

                minimumStock:Number(
                    item.minimumStock || 5
                ),

                unit:item.unit || "packet"


            });



            count++;


        }




        fs.unlinkSync(

            req.file.path

        );





        res.json({

            success:true,

            message:"Import completed",

            inserted:count

        });



    }

    catch(error){


        console.log(
            "IMPORT ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};