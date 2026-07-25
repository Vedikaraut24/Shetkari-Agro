import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";



export const getReports = async(req,res)=>{


    try{


        const totalProducts =
        await Product.countDocuments();



        const totalCustomers =
        await Customer.countDocuments();



        const totalBills =
        await Bill.countDocuments();





        const sales =
        await Bill.aggregate([

            {
                $group:{
                    _id:null,
                    total:{
                        $sum:"$grandTotal"
                    }
                }
            }

        ]);



        const totalSales =
        sales.length > 0
        ?
        sales[0].total
        :
        0;







        const inventory =
        await Product.aggregate([


            {
                $project:{

                    value:{

                        $multiply:[

                            "$purchasePrice",
                            "$currentStock"

                        ]

                    }

                }

            },


            {
                $group:{

                    _id:null,

                    total:{
                        $sum:"$value"
                    }

                }

            }


        ]);



        const inventoryValue =
        inventory.length > 0
        ?
        inventory[0].total
        :
        0;







        const lowStockProducts =
        await Product.find({

            $expr:{

                $lte:[

                    "$currentStock",
                    "$minimumStock"

                ]

            }

        });






        const recentBills =
        await Bill.find()

        .populate(
            "customer"
        )

        .sort({

            createdAt:-1

        })

        .limit(5);







        res.status(200).json({


            totalProducts,


            totalCustomers,


            totalBills,


            totalSales,


            inventoryValue,


            lowStockProducts,


            recentBills


        });



    }


    catch(error){


        console.log(
            "REPORT ERROR:",
            error.message
        );


        res.status(500).json({

            message:error.message

        });


    }


};