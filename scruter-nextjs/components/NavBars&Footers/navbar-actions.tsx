// "use client"

// import Button from "@/components/ui/button";
// import useCart from "@/hooks/use-cart";
// import { ShoppingBag } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const NavbarActions = () => {
//     //prevention for hydration error

//     const [isMounted,setIsMounted]=useState(false);

//     useEffect(()=>{
//         setIsMounted(true);
//     },[])

//     const router=useRouter();

//     const cart=useCart();

//     if(!isMounted) return null;

    

//     return ( 
//         <div className="ml-auto flex items-center gap-x-4">
//             <Button 
//                 onClick={()=>router.push("/cart")}
//                 className="flex items-center rounded-full bg-black px-4 py-2">
//                 <ShoppingBag
//                     size={20}
//                     color="white"
//                 />  
//                 <span className="ml-2 text-sm font-medium text-white">
//                     {cart.items.length}
//                 </span>
//             </Button>
//         </div>
//      );
// }
 
// export default NavbarActions;