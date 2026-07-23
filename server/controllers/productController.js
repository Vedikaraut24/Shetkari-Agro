import Product from "../models/Product.js";


// CREATE
export const createProduct = async(req,res)=>{

    try{

        console.log("Received Product:",req.body);


        const product = await Product.create(req.body);


        res.status(201).json({
            message:"Product Added",
            product
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};




// GET ALL
export const getProducts = async(req,res)=>{

    try{

        const products = await Product.find();

        res.json(products);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// GET SINGLE
export const getProductById = async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id);

        res.json(product);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};





// UPDATE
export const updateProduct = async(req,res)=>{

    try{

        const product =
        await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );


        res.json(product);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};





// DELETE
export const deleteProduct = async(req,res)=>{

    try{

        await Product.findByIdAndDelete(
            req.params.id
        );


        res.json({
            message:"Deleted"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};