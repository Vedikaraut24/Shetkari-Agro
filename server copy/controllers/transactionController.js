import Transaction from "../models/Transaction.js";



export const getTransactions = async(req,res)=>{


try{


const transactions =
await Transaction.find()

.populate("customer")

.populate("bill")

.sort({
createdAt:-1
});



res.json(transactions);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};