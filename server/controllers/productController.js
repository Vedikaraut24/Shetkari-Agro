import Product from "../models/Product.js";
import Category from "../models/Category.js";

import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";



// ===============================
// CREATE PRODUCT
// ===============================

export const createProduct = async (req, res) => {

    try {

        const {

            category

        } = req.body;

        // Auto Create Category
        if (category) {

            const exists = await Category.findOne({

                name: category

            });

            if (!exists) {

                await Category.create({

                    name: category

                });

            }

        }

        const product = await Product.create(req.body);

        res.status(201).json({

            message: "Product Added",

            product

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find().sort({

            createdAt: -1

        });

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// SEARCH PRODUCTS
// GET /api/products/search?keyword=abc
// ===============================

export const searchProducts = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const products = await Product.find({

            $or: [

                {

                    productName: {

                        $regex: keyword,

                        $options: "i"

                    }

                },

                {

                    category: {

                        $regex: keyword,

                        $options: "i"

                    }

                },

                {

                    brand: {

                        $regex: keyword,

                        $options: "i"

                    }

                }

            ]

        })

            .limit(10)

            .sort({

                productName: 1

            });

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(

            req.params.id

        );

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        res.json(product);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async (req, res) => {

    try {

        const {

            category

        } = req.body;

        if (category) {

            const exists = await Category.findOne({

                name: category

            });

            if (!exists) {

                await Category.create({

                    name: category

                });

            }

        }

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        res.json(product);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message: "Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ===============================
// IMPORT CSV / EXCEL
// ===============================

export const importProducts = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                message: "No file uploaded"

            });

        }

        let data = [];

        if (req.file.originalname.endsWith(".csv")) {

            data = await new Promise((resolve, reject) => {

                const rows = [];

                fs.createReadStream(req.file.path)

                    .pipe(csv())

                    .on("data", (row) => rows.push(row))

                    .on("end", () => resolve(rows))

                    .on("error", reject);

            });

        }

        else {

            const workbook = XLSX.readFile(

                req.file.path

            );

            const sheet = workbook.Sheets[

                workbook.SheetNames[0]

            ];

            data = XLSX.utils.sheet_to_json(sheet);

        }

        let count = 0;

        for (const item of data) {

            if (item.category) {

                const exists = await Category.findOne({

                    name: item.category

                });

                if (!exists) {

                    await Category.create({

                        name: item.category

                    });

                }

            }

            await Product.create({

                productName: item.productName,

                category: item.category,

                brand: item.brand || "",

                purchasePrice: Number(item.purchasePrice),

                sellingPrice: Number(item.sellingPrice),

                gst: Number(item.gst || 0),

                currentStock: Number(item.currentStock || 0),

                minimumStock: Number(item.minimumStock || 5),

                unit: item.unit || "packet",

                expiryDate: item.expiryDate || null,

                supplier: item.supplier || ""

            });

            count++;

        }

        fs.unlinkSync(req.file.path);

        res.json({

            message: "Import completed",

            inserted: count

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};