import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";

export const getReports = async (req, res) => {

    try {

        // =============================
        // Dashboard Counts
        // =============================

        const totalProducts = await Product.countDocuments();

        const totalCustomers = await Customer.countDocuments();

        const totalBills = await Bill.countDocuments();

        // =============================
        // Total Sales
        // =============================

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

        const totalSales = salesResult.length

            ? salesResult[0].total

            : 0;

        // =============================
        // Inventory Value
        // =============================

        const inventoryResult = await Product.aggregate([

            {

                $project: {

                    value: {

                        $multiply: [

                            "$purchasePrice",

                            "$currentStock"

                        ]

                    }

                }

            },

            {

                $group: {

                    _id: null,

                    total: {

                        $sum: "$value"

                    }

                }

            }

        ]);

        const inventoryValue = inventoryResult.length

            ? inventoryResult[0].total

            : 0;

        // =============================
        // Monthly Sales
        // =============================

        const monthlySales = await Bill.aggregate([

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

        // =============================
        // Category Distribution
        // =============================

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

        // =============================
        // Top Selling Products
        // =============================

        const topProducts = await Bill.aggregate([

            {

                $unwind: "$items"

            },

            {

                $group: {

                    _id: "$items.productName",

                    quantity: {

                        $sum: "$items.quantity"

                    }

                }

            },

            {

                $sort: {

                    quantity: -1

                }

            },

            {

                $limit: 5

            }

        ]);

        // =============================
        // Low Stock
        // =============================

        const lowStockProducts = await Product.find({

            $expr: {

                $lte: [

                    "$currentStock",

                    "$minimumStock"

                ]

            }

        });

        // =============================
        // Recent Bills
        // =============================

        const recentBills = await Bill.find()

            .populate("customer")

            .sort({

                createdAt: -1

            })

            .limit(5);

        res.json({

            totalProducts,

            totalCustomers,

            totalBills,

            totalSales,

            inventoryValue,

            monthlySales,

            categoryChart,

            topProducts,

            lowStockProducts,

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