import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Package,
    FolderTree,
    Users,
    ShoppingCart,
    Receipt,
    ShoppingBag,
    Settings,
    LogOut,
    X
} from "lucide-react";



export default function Sidebar({

    isOpen,
    setIsOpen

}) {



const menu = [


{
    name:"Dashboard",
    path:"/dashboard",
    icon:LayoutDashboard
},


{
    name:"Products",
    path:"/products",
    icon:Package
},


{
    name:"Categories",
    path:"/categories",
    icon:FolderTree
},


{
    name:"Customers",
    path:"/customers",
    icon:Users
},


{
    name:"Billing",
    path:"/billing",
    icon:ShoppingCart
},


{
    name:"Purchase",
    path:"/purchase",
    icon:ShoppingBag
},


{
    name:"Transactions",
    path:"/transactions",
    icon:Receipt
},


{
    name:"Settings",
    path:"/settings",
    icon:Settings
}


];





const logout=()=>{


localStorage.removeItem("token");


window.location.href="/";


};





return (

<>


<aside

className={`
fixed
top-0
left-0
z-40
h-screen
w-64
bg-gradient-to-b
from-green-800
to-green-900
text-white
shadow-2xl
transform
transition-transform
duration-300

${isOpen 
? "translate-x-0"
:
"-translate-x-full"
}

lg:translate-x-0
`}

>




{/* HEADER */}


<div className="
flex
items-center
justify-between
p-6
border-b
border-green-700
">


<div>


<h1 className="
text-2xl
font-bold
">

🌾 शेतकरी अॅग्रो

</h1>


<p className="
text-sm
text-green-200
">

Inventory System

</p>


</div>



<button

onClick={()=>setIsOpen(false)}

className="lg:hidden"

>

<X/>

</button>



</div>





{/* MENU */}


<nav className="mt-5">


{

menu.map(item=>{


const Icon=item.icon;



return (


<NavLink


key={item.path}


to={item.path}


onClick={()=>setIsOpen(false)}



className={({isActive})=>

`

flex
items-center
gap-4
px-6
py-4
transition-all

${

isActive

?

"bg-green-600 border-r-4 border-yellow-300"

:

"hover:bg-green-700"

}

`

}



>


<Icon size={20}/>


<span>

{item.name}

</span>



</NavLink>


)


})


}



</nav>





{/* LOGOUT */}


<div className="
absolute
bottom-6
left-0
w-full
px-6
">


<button


onClick={logout}


className="
w-full
flex
items-center
justify-center
gap-2
bg-red-500
hover:bg-red-600
rounded-lg
py-3
transition
"


>


<LogOut size={18}/>


Logout


</button>


</div>





</aside>


</>


);


}