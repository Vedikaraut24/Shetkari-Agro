import {useEffect,useState} from "react";
import {toast} from "react-toastify";

import {

getSettings,
updateSettings

}

from "../services/settingsService";



export default function Settings(){


const [form,setForm]=useState({

shopName:"",
ownerName:"",
phone:"",
email:"",
address:""

});




useEffect(()=>{


loadSettings();


},[]);






const loadSettings=async()=>{


try{


const data = await getSettings();


setForm(data);



}

catch(error){


console.log(error);


toast.error(

"Failed to load settings"

);


}


};






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:

e.target.value


});


};






const handleSubmit=async(e)=>{


e.preventDefault();



try{


await updateSettings(form);



toast.success(

"Settings Updated Successfully"

);



}

catch(error){


console.log(error);


toast.error(

"Update Failed"

);


}



};







return(


<div className="space-y-8">


<h1 className="text-3xl font-bold text-green-700">

⚙️ Shop Settings

</h1>





<div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl">



<form

onSubmit={handleSubmit}

className="space-y-5"

>



<div>

<label className="font-semibold">

Shop Name

</label>


<input

name="shopName"

value={form.shopName}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

/>

</div>







<div>

<label className="font-semibold">

Owner Name

</label>


<input

name="ownerName"

value={form.ownerName}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

/>

</div>







<div>

<label className="font-semibold">

Phone

</label>


<input

name="phone"

value={form.phone}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

/>

</div>







<div>

<label className="font-semibold">

Email

</label>


<input

name="email"

value={form.email}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

/>

</div>








<div>

<label className="font-semibold">

Address

</label>


<textarea

name="address"

value={form.address}

onChange={handleChange}

rows="4"

className="w-full border p-3 rounded-lg mt-2"

/>

</div>







<button

type="submit"

className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg"

>


Save Settings


</button>




</form>


</div>


</div>


);


}