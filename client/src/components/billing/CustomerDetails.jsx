import {useEffect,useState} from "react";
import {searchCustomers} from "../../services/customerService";


export default function CustomerDetails({

customer,
setCustomer

}){


const [keyword,setKeyword]=useState("");

const [suggestions,setSuggestions]=useState([]);





useEffect(()=>{


if(!keyword.trim()){

    setSuggestions([]);

    return;

}



const timer=setTimeout(async()=>{


try{


const data = await searchCustomers(keyword);


setSuggestions(data);



}
catch(error){

console.log(error);

}



},300);



return ()=>clearTimeout(timer);



},[keyword]);







const selectCustomer=(data)=>{


setCustomer({

name:data.name,

phone:data.phone,

address:data.address || ""

});



setKeyword(data.name);


setSuggestions([]);



};







return (

<div className="bg-white rounded-xl shadow-lg p-6">


<h2 className="text-2xl font-bold text-green-700 mb-5">

Customer Details

</h2>




<div className="relative">


<input

className="w-full border rounded-lg p-3"

placeholder="Search customer..."

value={keyword}

onChange={(e)=>{


setKeyword(e.target.value);


setCustomer({

...customer,

name:e.target.value

});


}}

/>





{

suggestions.length > 0 &&

<div className="absolute top-14 left-0 right-0 bg-white border rounded-lg shadow-xl z-50">


{

suggestions.map(c=>(


<div

key={c._id}

onClick={()=>selectCustomer(c)}

className="p-3 hover:bg-green-100 cursor-pointer border-b"

>


<div className="font-semibold">

{c.name}

</div>


<div className="text-sm text-gray-500">

{c.phone}

</div>


</div>


))

}



</div>

}



</div>





<input

className="w-full border rounded-lg p-3 mt-4"

placeholder="Phone Number"

value={customer.phone}

onChange={(e)=>

setCustomer({

...customer,

phone:e.target.value

})

}

/>





<textarea

className="w-full border rounded-lg p-3 mt-4"

placeholder="Address"

value={customer.address}

onChange={(e)=>

setCustomer({

...customer,

address:e.target.value

})

}

/>



</div>

);


}