import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";

export const getDashboard = async (req, res) => {

    try {

        // =========================
        // COUNTS
        // =========================

        const totalProducts = await Product.countDocuments();

        const totalCustomers = await Customer.countDocuments();

        const totalBills = await Bill.countDocuments();

        // =========================
        // TOTAL SALES
        // =========================

        const salesResult = await Bill.aggregate([

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$grandTotal"
                    }
                }
            }

        ]);

        const totalSales = salesResult[0]?.total || 0;

        // =========================
        // TODAY SALES
        // =========================

        const start = new Date();

        start.setHours(0, 0, 0, 0);

        const end = new Date();

        end.setHours(23, 59, 59, 999);

        const todayResult = await Bill.aggregate([

            {
                $match: {

                    createdAt: {

                        $gte: start,

                        $lte: end

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    total: {

                        $sum: "$grandTotal"

                    }

                }

            }

        ]);

        const todaySales = todayResult[0]?.total || 0;

        // =========================
        // INVENTORY VALUE
        // =========================

        const products = await Product.find();

        let inventoryValue = 0;

        products.forEach(product => {

            inventoryValue +=
                (product.purchasePrice || 0) *
                (product.currentStock || 0);

        });

        // =========================
        // LOW STOCK
        // =========================

        const lowStockProducts = await Product.find({

            $expr: {

                $lte: [

                    "$currentStock",

                    "$minimumStock"

                ]

            }

        });

        // =========================
        // SALES CHART
        // =========================

        const salesChart = await Bill.aggregate([

            {

                $group: {

                    _id: {

                        month: {

                            $month: "$createdAt"

                        }

                    },

                    sales: {

                        $sum: "$grandTotal"

                    }

                }

            },

            {

                $sort: {

                    "_id.month": 1

                }

            }

        ]);

        // =========================
        // CATEGORY CHART
        // =========================

        const categoryChart = await Product.aggregate([

            {

                $group: {

                    _id: "$category",

                    value: {

                        $sum: 1

                    }

                }

            }

        ]);

        // =========================
        // RECENT BILLS
        // =========================

        const recentBills = await Bill.find()

            .populate("customer")

            .sort({

                createdAt: -1

            })

            .limit(5);

        // =========================
        // RESPONSE
        // =========================

        res.json({

            totalProducts,

            totalCustomers,

            totalBills,

            totalSales,

            todaySales,

            inventoryValue,

            lowStock: lowStockProducts.length,

            lowStockProducts,

            salesChart,

            categoryChart,

            recentBills

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};