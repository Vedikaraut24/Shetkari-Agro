import Customer from "../models/Customer.js";



// CREATE CUSTOMER

export const createCustomer = async(req,res)=>{


try{


const customer =
await Customer.create(
req.body
);



res.status(201).json({

message:"Customer Added",

customer

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};





// GET ALL CUSTOMERS

export const getCustomers = async(req,res)=>{


try{


const customers =
await Customer.find()
.sort({
createdAt:-1
});



res.json(customers);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};







// GET SINGLE CUSTOMER

export const getCustomerById = async(req,res)=>{


try{


const customer =
await Customer.findById(
req.params.id
);



res.json(customer);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};








// UPDATE CUSTOMER

export const updateCustomer = async(req,res)=>{


try{


const customer =
await Customer.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(customer);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};







// DELETE CUSTOMER

export const deleteCustomer = async(req,res)=>{


try{


await Customer.findByIdAndDelete(

req.params.id

);



res.json({

message:"Customer deleted"

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};