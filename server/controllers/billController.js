import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";



// =======================
// CREATE BILL
// =======================

export const createBill = async (req, res) => {

    try {

        const {

            customer,
            items,
            paymentStatus = "Paid"

        } = req.body;



        if (!customer?.name || !customer?.phone) {

            return res.status(400).json({

                message: "Customer details required"

            });

        }



        if (!items || items.length === 0) {

            return res.status(400).json({

                message: "No products selected"

            });

        }



        // =========================
        // FIND OR CREATE CUSTOMER
        // =========================

        let customerData = await Customer.findOne({

            phone: customer.phone

        });



        if (!customerData) {


            customerData = await Customer.create({

                name: customer.name,

                phone: customer.phone,

                address: customer.address || ""

            });


        }



        let subTotal = 0;

        let gstAmount = 0;

        const billItems = [];



        // =========================
        // PROCESS PRODUCTS
        // =========================

        for (const item of items) {


            const product = await Product.findById(

                item._id

            );



            if (!product) {

                return res.status(404).json({

                    message: "Product not found"

                });

            }



            if (

                product.currentStock < item.quantity

            ) {

                return res.status(400).json({

                    message:

                    `${product.productName} stock unavailable`

                });

            }




            const quantity = Number(item.quantity);


            const price = product.sellingPrice;


            const gst = product.gst || 0;


            const total = quantity * price;


            const gstValue =

                (total * gst) / 100;



            subTotal += total;


            gstAmount += gstValue;



            billItems.push({

                product: product._id,

                productName:

                product.productName,

                quantity,

                price,

                gst,

                total

            });



            // Reduce Stock

            product.currentStock -= quantity;


            await product.save();


        }




        const grandTotal =

            subTotal + gstAmount;




        // =========================
        // CREATE BILL
        // =========================


        const bill = await Bill.create({

            customer:

            customerData._id,


            items: billItems,


            subTotal,


            gstAmount,


            grandTotal,


            paymentStatus


        });





        // =========================
        // CREATE TRANSACTION
        // =========================


        await Transaction.create({

            bill: bill._id,


            customer:

            customerData._id,


            amount: grandTotal,


            type:"Sale",


            paymentStatus


        });





        res.status(201).json({

            message:

            "Bill Generated Successfully",


            bill

        });


    }

    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }

};






// =======================
// GET ALL BILLS
// =======================


export const getBills = async(req,res)=>{


    try{


        const bills = await Bill.find()

        .populate("customer")

        .populate("items.product")

        .sort({

            createdAt:-1

        });



        res.json(bills);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// =======================
// GET SINGLE BILL
// =======================


export const getBillById = async(req,res)=>{


    try{


        const bill = await Bill.findById(

            req.params.id

        )

        .populate("customer")

        .populate("items.product");




        if(!bill){


            return res.status(404).json({

                message:"Bill not found"

            });


        }



        res.json(bill);



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// =======================
// DELETE BILL
// =======================


export const deleteBill = async(req,res)=>{


    try{


        const bill = await Bill.findById(

            req.params.id

        );



        if(!bill){


            return res.status(404).json({

                message:"Bill not found"

            });


        }




        // Restore Stock

        for(const item of bill.items){


            const product = await Product.findById(

                item.product

            );



            if(product){


                product.currentStock +=

                item.quantity;



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

            message:"Bill Deleted Successfully"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};