import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Bill from "../models/Bill.js";



export const getDashboard = async(req,res)=>{

    try{


        const totalProducts =
        await Product.countDocuments();



        const totalCustomers =
        await Customer.countDocuments();



        const totalBills =
        await Bill.countDocuments();




        // LOW STOCK

        const lowStockProducts =
        await Product.find({

            $expr:{
                $lte:[
                    "$currentStock",
                    "$minimumStock"
                ]
            }

        });



        const lowStock =
        lowStockProducts.length;




        // INVENTORY VALUE

        const inventoryData =
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
        inventoryData[0]?.total || 0;





        // TOTAL SALES


        const salesData =
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
        salesData[0]?.total || 0;






        // TODAY SALES


        const start =
        new Date();

        start.setHours(
            0,0,0,0
        );



        const todayData =
        await Bill.aggregate([

            {

                $match:{

                    createdAt:{
                        $gte:start
                    }

                }

            },


            {

                $group:{

                    _id:null,

                    total:{
                        $sum:"$grandTotal"
                    }

                }

            }


        ]);



        const todaySales =
        todayData[0]?.total || 0;







        // SALES CHART


        const salesChart =
        await Bill.aggregate([

            {

                $group:{

                    _id:{
                        month:{
                            $month:"$createdAt"
                        }
                    },

                    sales:{
                        $sum:"$grandTotal"
                    }

                }

            },


            {

                $sort:{
                    "_id.month":1
                }

            }


        ]);






        // CATEGORY CHART


        const categoryChart =
        await Product.aggregate([

            {

                $group:{

                    _id:"$category",

                    value:{
                        $sum:1
                    }

                }

            }

        ]);






        // RECENT BILLS


        const recentBills =
        await Bill.find()

        .populate("customer")

        .sort({

            createdAt:-1

        })

        .limit(5);





        res.json({

            totalProducts,

            totalCustomers,

            totalBills,

            lowStock,

            inventoryValue,

            totalSales,

            todaySales,

            salesChart,

            categoryChart,

            lowStockProducts,

            recentBills

        });



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }


};