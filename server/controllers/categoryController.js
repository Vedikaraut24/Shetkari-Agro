import Category from "../models/Category.js";



// GET ALL

export const getCategories = async(req,res)=>{

try{

const categories =
await Category.find()
.sort({
createdAt:-1
});


res.json(categories);


}
catch(error){

res.status(500)
.json({
message:"Failed to get categories"
});

}

};






// CREATE

export const createCategory = async(req,res)=>{

try{


const category =
await Category.create(
req.body
);


res.status(201)
.json(category);



}
catch(error){

res.status(500)
.json({
message:"Category creation failed"
});


}

};






// UPDATE

export const updateCategory = async(req,res)=>{


try{


const category =
await Category.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(category);



}
catch(error){


res.status(500)
.json({
message:"Update failed"
});


}

};







// DELETE

export const deleteCategory = async(req,res)=>{


try{


await Category.findByIdAndDelete(
req.params.id
);



res.json({
message:"Deleted"
});



}
catch(error){


res.status(500)
.json({
message:"Delete failed"
});


}

};