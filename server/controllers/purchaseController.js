import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";





export const createPurchase = async(req,res)=>{


try{


const {


supplierName,

items,

paymentStatus


}=req.body;




let totalAmount=0;



for(const item of items){



const product = await Product.findById(

item.product

);




if(!product){


return res.status(404).json({

message:"Product not found"

});


}





// increase stock

product.currentStock += Number(item.quantity);



// update purchase price

product.purchasePrice = item.purchasePrice;



// update minimum stock

if(item.minimumStock){

product.minimumStock=item.minimumStock;

}



// update expiry

if(item.expiryDate){

product.expiryDate=item.expiryDate;

}



await product.save();



item.total =

Number(item.quantity) *

Number(item.purchasePrice);



totalAmount += item.total;


}




const purchase = await Purchase.create({

supplierName,

items,

paymentStatus,

totalAmount


});




res.status(201).json(purchase);



}

catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}



};