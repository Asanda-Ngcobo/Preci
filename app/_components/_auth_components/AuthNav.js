'use client'

import { useMenu } from "@/app/providers/MenuProvider"
import { LogIn, Menu, User, X } from "@deemlol/next-icons"
import Link from "next/link"
import { useEffect, useState } from "react"

function Nav() {
  const { toggleMenu, menuOpen } = useMenu()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-15 flex top-0 justify-between items-center w-[90%] mx-auto">
      <Link href='/'>
        <h2 className="font-sans text-(--accent-primary)  text-3xl">
          Préci
        </h2>
      </Link>

      <ul className="flex gap-4 text-sm cursor-pointer">
  {/*<li className="hover:underline w-fit h-fit p-2 rounded-2xl active:underline">
          <Link href='/summary/pricing'>Pricing</Link>
        </li> */}
   
    
        <li className="hover:bg-gray-300 w-fit h-fit py-1 px-2 rounded-xl">
          <Link href='/auth/login' className="flex gap-2 justify-center items-center h-fit w-fit"><User width={15}/>Login</Link>
        </li>
        {/* <li className="hover:underline w-fit h-fit p-2 rounded-2xl active:underline">
          <Link href='/blog'>Blog</Link>
        </li>
        <li className="hover:underline w-fit h-fit p-2 rounded-2xl active:underline">
          <Link href='/about'>About</Link>
        </li> */}
      </ul>

      {/* {mounted && (
        menuOpen
          ? <X color="#6B7280" onClick={toggleMenu} />
          : <Menu color="#6B7280" onClick={toggleMenu}
           className="md:hidden"/>
      )} */}
    </div>
  )
}

export default Nav
