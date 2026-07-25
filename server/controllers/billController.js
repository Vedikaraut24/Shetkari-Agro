import mongoose from "mongoose";

import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";



// =================================
// CREATE BILL
// =================================

export const createBill = async(req,res)=>{


    const session = await mongoose.startSession();


    try{


        session.startTransaction();



        const {

            customer,

            items,

            paymentStatus="Paid"


        } = req.body;




        // Validation


        if(
            !customer?.name ||
            !customer?.phone
        ){


            throw new Error(
                "Customer details required"
            );


        }




        if(
            !items ||
            items.length===0
        ){


            throw new Error(
                "No products selected"
            );


        }





        // ============================
        // CUSTOMER
        // ============================


        let customerData =
        await Customer.findOne({

            phone:customer.phone

        }).session(session);





        if(!customerData){


            customerData =
            await Customer.create([{


                name:customer.name,

                phone:customer.phone,

                address:
                customer.address || ""


            }],{session});


            customerData =
            customerData[0];


        }

        else{


            customerData.name =
            customer.name;


            customerData.address =
            customer.address || "";



            await customerData.save({
                session
            });


        }









        let subTotal=0;

        let gstAmount=0;


        const billItems=[];






        // ============================
        // PRODUCTS
        // ============================


        for(
            const item of items
        ){


            const product =
            await Product.findById(

                item._id

            ).session(session);





            if(!product){


                throw new Error(
                    "Product not found"
                );


            }





            const quantity =
            Number(item.quantity);





            if(
                product.currentStock <
                quantity
            ){


                throw new Error(

                    `${product.productName} stock unavailable`

                );


            }






            const price =
            Number(product.sellingPrice);



            const gst =
            Number(product.gst || 0);




            const total =
            price * quantity;



            const gstValue =
            (total * gst)/100;





            subTotal += total;

            gstAmount += gstValue;







            billItems.push({


                product:
                product._id,


                productName:
                product.productName,


                quantity,


                price,


                gst,


                total


            });







            // reduce stock

            product.currentStock -= quantity;


            await product.save({
                session
            });



        }







        const grandTotal =
        subTotal + gstAmount;







        // ============================
        // CREATE BILL
        // ============================



        const billArray =
        await Bill.create([{


            customer:
            customerData._id,


            items:
            billItems,


            subTotal,


            gstAmount,


            grandTotal,


            paymentStatus



        }],{session});




        const newBill =
        billArray[0];








        // ============================
        // TRANSACTION
        // ============================


        await Transaction.create([{


            bill:
            newBill._id,


            customer:
            customerData._id,


            amount:
            grandTotal,


            type:
            "Sale",


            paymentStatus



        }],{session});







        await session.commitTransaction();







        const bill =
        await Bill.findById(

            newBill._id

        )

        .populate("customer")

        .populate(
            "items.product"
        );







        res.status(201).json({


            success:true,


            message:
            "Bill Generated Successfully",


            bill



        });






    }

    catch(error){



        await session.abortTransaction();



        console.log(
            "CREATE BILL ERROR:",
            error
        );



        res.status(500).json({


            success:false,


            message:
            error.message


        });


    }


    finally{


        session.endSession();


    }


};









// =================================
// GET ALL BILLS
// =================================


export const getBills = async(req,res)=>{


    try{


        const bills =
        await Bill.find()

        .populate("customer")

        .populate(
            "items.product"
        )

        .sort({

            createdAt:-1

        });



        res.json(bills);



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =================================
// GET SINGLE BILL
// =================================


export const getBillById = async(req,res)=>{


    try{


        const bill =
        await Bill.findById(

            req.params.id

        )

        .populate("customer")

        .populate(
            "items.product"
        );





        if(!bill){


            return res.status(404).json({

                success:false,

                message:
                "Bill not found"

            });


        }



        res.json(bill);



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =================================
// DELETE BILL
// =================================


export const deleteBill = async(req,res)=>{


    try{


        const bill =
        await Bill.findById(

            req.params.id

        );




        if(!bill){


            return res.status(404).json({

                message:
                "Bill not found"

            });


        }






        // Restore stock


        for(
            const item of bill.items
        ){


            const product =
            await Product.findById(

                item.product

            );



            if(product){


                product.currentStock +=
                Number(item.quantity);



                await product.save();


            }


        }





        await Transaction.deleteMany({

            bill:bill._id

        });





        await Bill.findByIdAndDelete(

            bill._id

        );





        res.json({


            success:true,

            message:
            "Bill deleted successfully"


        });




    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};