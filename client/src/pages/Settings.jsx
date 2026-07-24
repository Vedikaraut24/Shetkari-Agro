import React, { useEffect, useState } from "react";

import {
  Store,
  Lock,
  Languages,
  Database,
  Package,
  Users,
  Receipt,
  Save
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { getReports } from "../services/reportService";



const Settings = () => {


const { t, i18n } = useTranslation();



const [stats,setStats]=useState({

products:0,
customers:0,
bills:0

});



const [language,setLanguage]=useState(

localStorage.getItem("language") || "en"

);



useEffect(()=>{

loadStats();

},[]);





const loadStats=async()=>{

try{

const data=await getReports();


setStats({

products:data.totalProducts || 0,

customers:data.totalCustomers || 0,

bills:data.totalBills || 0

});


}

catch(error){

console.log(error);

}

};





const changeLanguage=(e)=>{


const lang=e.target.value;


setLanguage(lang);


i18n.changeLanguage(lang);


localStorage.setItem(
"language",
lang
);


};





return (

<div className="min-h-screen bg-gray-50 p-6">


<div className="bg-white rounded-xl shadow p-5 mb-6">


<h1 className="text-3xl font-bold text-green-700">

🌾 {t("shopName")}

</h1>


<p className="text-gray-600">

{t("settings")}

</p>


</div>





<div className="grid md:grid-cols-3 gap-5 mb-6">


<StatCard

title={t("products")}

value={stats.products}

icon={<Package/>}

/>



<StatCard

title={t("customers")}

value={stats.customers}

icon={<Users/>}

/>



<StatCard

title={t("bills")}

value={stats.bills}

icon={<Receipt/>}

/>



</div>






<div className="bg-white rounded-xl shadow p-5 mb-6">


<div className="flex gap-3 items-center mb-5">

<Store className="text-green-700"/>

<h2 className="text-xl font-semibold text-green-700">

{t("shopInformation")}

</h2>

</div>




<Input

label={t("shopName")}

value="🌾 शेतकरी अॅग्रो"

disabled

/>



<Input

label={t("adminName")}

value="रुषिकेश बंड"

disabled

/>





<button className="mt-5 bg-green-700 text-white px-5 py-2 rounded-lg flex gap-2">

<Save size={18}/>

{t("save")}

</button>


</div>








<div className="bg-white rounded-xl shadow p-5">


<div className="flex items-center gap-3 mb-5">


<Languages className="text-green-700"/>


<h2 className="text-xl font-semibold text-green-700">

{t("applicationSettings")}

</h2>


</div>





<div className="flex justify-between items-center border rounded-lg p-4">


<div>

<p className="font-medium">

{t("language")}

</p>


<p className="text-gray-500 text-sm">

{t("chooseLanguage")}

</p>


</div>




<select

value={language}

onChange={changeLanguage}

className="border rounded-lg px-3 py-2"

>


<option value="en">

English

</option>


<option value="hi">

हिंदी

</option>


<option value="mr">

मराठी

</option>



</select>


</div>





<div className="mt-5 flex gap-3 text-gray-600">

<Database/>

{t("databaseConnected")}

</div>



</div>





</div>


);

};







const Input=({

label,

value,

disabled

})=>(


<div className="mb-4">


<label className="block text-sm mb-1">

{label}

</label>


<input

value={value}

disabled={disabled}

className="w-full border rounded-lg p-2 bg-gray-100"

/>


</div>


);






const StatCard=({

title,

value,

icon

})=>(


<div className="bg-white shadow rounded-xl p-5 flex justify-between">


<div>

<p className="text-gray-500">

{title}

</p>


<h2 className="text-2xl font-bold text-green-700">

{value}

</h2>


</div>


<div className="text-green-700">

{icon}

</div>


</div>


);



export default Settings;