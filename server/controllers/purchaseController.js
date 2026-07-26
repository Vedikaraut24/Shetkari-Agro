import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";



export const createPurchase = async(req,res)=>{


try{


const {

supplierName,

items,

paymentStatus


}=req.body;



if(
!supplierName ||
!items ||
items.length===0
){

return res.status(400).json({

message:"Invalid purchase data"

});

}



let totalAmount=0;



const purchaseItems=[];



for(const item of items){



let product = await Product.findOne({

productName:item.productName

});




// If product already exists

if(product){



product.currentStock += Number(
item.quantity
);



product.purchasePrice =
Number(item.purchasePrice);



if(item.sellingPrice){

product.sellingPrice =
Number(item.sellingPrice);

}



if(item.minimumStock){

product.minimumStock =
Number(item.minimumStock);

}



if(item.expiryDate){

product.expiryDate =
item.expiryDate;

}



await product.save();



}

else{


// Create new product


product = await Product.create({


productName:item.productName,


category:item.category || "",


brand:item.brand || "",


purchasePrice:Number(
item.purchasePrice
),


sellingPrice:Number(
item.sellingPrice || 0
),


gst:Number(
item.gst || 0
),


currentStock:Number(
item.quantity
),


minimumStock:Number(
item.minimumStock || 5
),


unit:item.unit || "packet",


expiryDate:item.expiryDate || null


});


}





const itemTotal =

Number(item.quantity) *

Number(item.purchasePrice);



totalAmount += itemTotal;




purchaseItems.push({


product:product._id,


productName:item.productName,


category:item.category,


brand:item.brand,


quantity:Number(item.quantity),


purchasePrice:Number(item.purchasePrice),


sellingPrice:Number(item.sellingPrice || 0),


gst:Number(item.gst || 0),


minimumStock:Number(item.minimumStock || 5),


unit:item.unit || "packet",


expiryDate:item.expiryDate || null,


total:itemTotal


});



}






const purchase = await Purchase.create({


supplierName,


items:purchaseItems,


paymentStatus,


totalAmount


});





res.status(201).json({

success:true,

message:"Purchase created successfully",

purchase

});



}

catch(error){


console.log(
"Purchase Error:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}


};