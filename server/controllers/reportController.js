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





// SALES

const sales =
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
sales[0]?.total || 0;







// INVENTORY VALUE

const inventory =
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
inventory[0]?.total || 0;







// MONTHLY SALES


const monthlySales =
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




const monthNames=[

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];



const formattedMonthlySales =
monthlySales.map(item=>({

month:
monthNames[item._id.month-1],

sales:item.sales


}));









// CATEGORY REPORT


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





const formattedCategory =
categoryChart.map(item=>({

category:item._id || "Other",

value:item.value


}));









// TOP PRODUCTS


const topProducts =
await Bill.aggregate([


{
$unwind:"$items"
},


{
$group:{


_id:"$items.productName",


quantity:{
$sum:"$items.quantity"
}


}

},



{
$sort:{
quantity:-1
}
},


{
$limit:5
}


]);








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









// RECENT BILLS


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

totalSales,

inventoryValue,


monthlySales:
formattedMonthlySales,


categoryChart:
formattedCategory,


topProducts,


lowStockProducts,


recentBills


});



}

catch(error){


console.log(
"REPORT ERROR:",
error
);


res.status(500).json({

success:false,

message:error.message

});


}


};