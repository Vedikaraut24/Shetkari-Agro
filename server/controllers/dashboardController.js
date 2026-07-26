import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Bill from "../models/Bill.js";
import Purchase from "../models/Purchase.js";



export const getDashboard = async(req,res)=>{


try{


const totalProducts =
await Product.countDocuments();



const totalCustomers =
await Customer.countDocuments();



const totalBills =
await Bill.countDocuments();





// ==========================
// PURCHASE DATA
// ==========================


const totalPurchases =
await Purchase.countDocuments();



const purchaseData =
await Purchase.aggregate([

{

$group:{

_id:null,

total:{

$sum:{

$ifNull:[

"$totalAmount",

0

]

}

}

}

}

]);



const purchaseAmount =
purchaseData[0]?.total || 0;







// ==========================
// LOW STOCK
// ==========================


const lowStockProducts =
await Product.find({

$expr:{

$lte:[

{

$ifNull:[

"$currentStock",

0

]

},

{

$ifNull:[

"$minimumStock",

0

]

}

]

}

});



const lowStock =
lowStockProducts.length;







// ==========================
// INVENTORY VALUE
// ==========================


const inventoryData =
await Product.aggregate([


{

$project:{


value:{


$multiply:[


{

$ifNull:[

"$purchasePrice",

0

]

},


{

$ifNull:[

"$currentStock",

0

]

}


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









// ==========================
// TOTAL SALES
// ==========================


const salesData =
await Bill.aggregate([


{

$group:{


_id:null,


total:{


$sum:{


$ifNull:[

"$grandTotal",

0

]


}


}


}


}


]);



const totalSales =
salesData[0]?.total || 0;









// ==========================
// TODAY SALES
// ==========================


const start =
new Date();


start.setHours(

0,

0,

0,

0

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


$sum:{


$ifNull:[

"$grandTotal",

0

]


}


}


}


}


]);



const todaySales =
todayData[0]?.total || 0;










// ==========================
// SALES GRAPH
// ==========================


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


$sum:{


$ifNull:[

"$grandTotal",

0

]


}


}


}


},



{

$sort:{

"_id.month":1

}


}


]);










// ==========================
// CATEGORY GRAPH
// ==========================


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









// ==========================
// RECENT BILLS
// ==========================


const recentBills =
await Bill.find()

.populate("customer")

.sort({

createdAt:-1

})

.limit(5);







res.status(200).json({


success:true,


totalProducts,


totalCustomers,


totalBills,



// PURCHASE

totalPurchases,

purchaseAmount,



// STOCK

lowStock,

inventoryValue,



// SALES

totalSales,

todaySales,



// CHARTS

salesChart,

categoryChart,



// TABLES

lowStockProducts,

recentBills



});




}



catch(error){


console.log(

"Dashboard Controller Error:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};