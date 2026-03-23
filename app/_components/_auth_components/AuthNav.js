'use client'

import { useMenu } from "@/app/providers/MenuProvider"
import { LogIn, Menu, X } from "@deemlol/next-icons"
import Link from "next/link"






function Nav() {
    const {toggleMenu, menuOpen} = useMenu()
    
    return (
        <div className="h-15 flex top-0 
        justify-between
         items-center w-[80%] mx-auto">


             <h2 className="font-sans text-(--accent-primary) font-bold
                text-3xl ">
                   Préci
                </h2>
    
         
          
 <ul className="flex gap-4 text-sm cursor-pointer">
  <li className="hover:bg-(--accent-secondary) w-fit h-fit 
  p-2 rounded-2xl"><Link href='#meet-preci'>Meet Préci</Link></li>
   <li className="hover:bg-(--accent-secondary) w-fit h-fit 
  p-2 rounded-2xl
  active:bg-(--accent-primary) 
  "><Link href='/blog'>Blog</Link></li>
 
 </ul>
            
        </div>
    )
}

export default Nav
