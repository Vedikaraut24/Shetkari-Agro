import Settings from "../models/Settings.js";



// GET SETTINGS

export const getSettings = async(req,res)=>{


try{


let settings = await Settings.findOne();



if(!settings){


settings = await Settings.create({});


}



res.json(settings);



}

catch(error){


res.status(500).json({

message:error.message

});


}


};






// UPDATE SETTINGS


export const updateSettings = async(req,res)=>{


try{


let settings = await Settings.findOne();



if(settings){


settings = await Settings.findByIdAndUpdate(

settings._id,

req.body,

{

new:true

}

);


}

else{


settings = await Settings.create(req.body);


}




res.json(settings);



}

catch(error){


res.status(500).json({

message:error.message

});


}


};