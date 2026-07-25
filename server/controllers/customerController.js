import Customer from "../models/Customer.js";



// ===============================
// CREATE CUSTOMER
// ===============================

export const createCustomer = async(req,res)=>{


    try{


        const customer =

        await Customer.create(req.body);



        res.status(201).json({

            success:true,

            message:"Customer Added",

            customer

        });



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







// ===============================
// GET CUSTOMERS
// ===============================

export const getCustomers = async(req,res)=>{


    try{


        const customers =

        await Customer.find()

        .sort({

            createdAt:-1

        });



        res.json(customers);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ===============================
// SEARCH CUSTOMER
// ===============================

export const searchCustomers = async(req,res)=>{


    try{


        const keyword =

        req.query.keyword || "";



        const customers =

        await Customer.find({


            $or:[


                {

                    name:{

                        $regex:keyword,

                        $options:"i"

                    }

                },


                {

                    phone:{

                        $regex:keyword,

                        $options:"i"

                    }

                }


            ]


        })

        .limit(10);



        res.json(customers);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ===============================
// UPDATE CUSTOMER
// ===============================

export const updateCustomer = async(req,res)=>{


    try{


        const customer =

        await Customer.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true,

                runValidators:true

            }


        );



        res.json(customer);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ===============================
// DELETE CUSTOMER
// ===============================

export const deleteCustomer = async(req,res)=>{


    try{


        await Customer.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"Customer Deleted"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};