import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Bill from "../models/Bill.js";

export const getDashboard = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await Customer.countDocuments();
        const totalBills = await Bill.countDocuments();

        const products = await Product.find();

        const lowStock = products.filter(
            p => p.currentStock <= p.minimumStock
        ).length;

        const inventoryValue = products.reduce(
            (sum, p) => sum + p.purchasePrice * p.currentStock,
            0
        );

        const bills = await Bill.find();

        const totalSales = bills.reduce(
            (sum, bill) => sum + bill.grandTotal,
            0
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaySales = bills
            .filter(b => new Date(b.createdAt) >= today)
            .reduce((sum, b) => sum + b.grandTotal, 0);

        res.json({
            totalProducts,
            totalCustomers,
            totalBills,
            lowStock,
            inventoryValue,
            totalSales,
            todaySales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};