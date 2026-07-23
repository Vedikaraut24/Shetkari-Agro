import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";



// =======================
// CREATE BILL
// =======================

export const createBill = async (req, res) => {

    try {

        const {
            customer,
            items,
            paymentStatus
        } = req.body;


        if (!customer) {
            return res.status(400).json({
                message: "Customer is required"
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No products selected"
            });
        }


        let subTotal = 0;
        let gstAmount = 0;

        const billItems = [];


        for (const item of items) {

            const product = await Product.findById(item.product);

            if (!product) {

                return res.status(404).json({
                    message: `Product not found`
                });

            }

            if (product.currentStock < item.quantity) {

                return res.status(400).json({
                    message: `${product.productName} has only ${product.currentStock} stock left`
                });

            }

            const quantity = Number(item.quantity);

            const price = product.sellingPrice;

            const gst = product.gst;

            const total = quantity * price;

            const gstValue = (total * gst) / 100;

            subTotal += total;

            gstAmount += gstValue;


            billItems.push({

                product: product._id,

                productName: product.productName,

                quantity,

                price,

                gst,

                total

            });


            // Reduce stock

            product.currentStock -= quantity;

            await product.save();

        }


        const grandTotal = subTotal + gstAmount;


        const bill = await Bill.create({

            customer,

            items: billItems,

            subTotal,

            gstAmount,

            grandTotal,

            paymentStatus

        });


        // Save Transaction

        await Transaction.create({

            bill: bill._id,

            customer,

            amount: grandTotal,

            type: "Sale",

            paymentStatus

        });


        res.status(201).json({

            message: "Bill Generated Successfully",

            bill

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};




// =======================
// GET ALL BILLS
// =======================

export const getBills = async (req, res) => {

    try {

        const bills = await Bill.find()

            .populate("customer")

            .populate("items.product")

            .sort({
                createdAt: -1
            });

        res.json(bills);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// =======================
// GET SINGLE BILL
// =======================

export const getBillById = async (req, res) => {

    try {

        const bill = await Bill.findById(req.params.id)

            .populate("customer")

            .populate("items.product");

        if (!bill) {

            return res.status(404).json({
                message: "Bill not found"
            });

        }

        res.json(bill);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// =======================
// DELETE BILL
// =======================

export const deleteBill = async (req, res) => {

    try {

        const bill = await Bill.findById(req.params.id);

        if (!bill) {

            return res.status(404).json({
                message: "Bill not found"
            });

        }

        // Restore stock

        for (const item of bill.items) {

            const product = await Product.findById(item.product);

            if (product) {

                product.currentStock += item.quantity;

                await product.save();

            }

        }

        await Transaction.deleteMany({
            bill: bill._id
        });

        await Bill.findByIdAndDelete(req.params.id);

        res.json({

            message: "Bill Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};