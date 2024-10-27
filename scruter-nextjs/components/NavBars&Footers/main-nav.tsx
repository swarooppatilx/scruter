"use client"

import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = () => {
    
    const pathname=usePathname();
    
    const routes=[{
        href: `/`,
        label:"HomePage",
        active: pathname.startsWith(`/`)
    }]

    
    return ( 
        <div
            className="mx-40     flex items-center justify-center space-x-4 lg:space-x-6"
        >
            {routes.map((route)=>(
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                            "text-sm font-medium transition-colours hover:text-black",
                            route.active?"text-black":"text-neutral-500"
                    )}
                    
                >
                    {route.label}
                </Link>
            ))}
            
        </div>
     );
}
 
export default MainNav;