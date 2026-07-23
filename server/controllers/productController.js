import Product from "../models/Product.js";
import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";



// CREATE PRODUCT

export const createProduct = async(req,res)=>{

try{


const product =
await Product.create(req.body);


res.status(201).json({

message:"Product Added",

product

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};





// GET ALL PRODUCTS

export const getProducts = async(req,res)=>{

try{


const products =
await Product.find();



res.json(products);



}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// GET SINGLE PRODUCT

export const getProductById = async(req,res)=>{


try{


const product =
await Product.findById(
req.params.id
);



res.json(product);



}
catch(error){

res.status(500).json({

message:error.message

});

}


};








// UPDATE PRODUCT

export const updateProduct = async(req,res)=>{


try{


const product =
await Product.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(product);



}
catch(error){

res.status(500).json({

message:error.message

});

}


};








// DELETE PRODUCT

export const deleteProduct = async(req,res)=>{


try{


await Product.findByIdAndDelete(

req.params.id

);



res.json({

message:"Deleted"

});



}
catch(error){

res.status(500).json({

message:error.message

});

}


};









// IMPORT CSV / EXCEL

export const importProducts = async(req,res)=>{


try{


console.log("IMPORT REQUEST RECEIVED");

console.log(req.file);



if(!req.file){

return res.status(400).json({

message:"No file uploaded"

});

}




let data=[];



if(
req.file.originalname.endsWith(".csv")
){


data =
await new Promise(
(resolve,reject)=>{


const rows=[];



fs.createReadStream(
req.file.path
)

.pipe(csv())

.on(
"data",
(row)=>rows.push(row)
)

.on(
"end",
()=>resolve(rows)
)

.on(
"error",
reject
);


}

);



}
else{


const workbook =
XLSX.readFile(
req.file.path
);



const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];



data =
XLSX.utils.sheet_to_json(
sheet
);


}




console.log(
"IMPORT DATA",
data
);



let count=0;



for(
const item of data
){


await Product.create({

productName:item.productName,

category:item.category,

brand:item.brand || "",

purchasePrice:
Number(item.purchasePrice),

sellingPrice:
Number(item.sellingPrice),

gst:
Number(item.gst || 0),

currentStock:
Number(item.currentStock || 0),

minimumStock:
Number(item.minimumStock || 5),

unit:
item.unit || "packet",

expiryDate:
item.expiryDate || null,

supplier:
item.supplier || ""

});



count++;


}



fs.unlinkSync(
req.file.path
);



res.json({

message:"Import completed",

inserted:count

});



}
catch(error){


console.log(
"IMPORT ERROR",
error
);



res.status(500).json({

message:error.message

});


}

};