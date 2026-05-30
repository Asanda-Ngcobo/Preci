'use client'

import { useMenu } from "@/app/providers/MenuProvider"
import { LogIn, Menu, X } from "@deemlol/next-icons"
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
        <h2 className="font-sans text-(--accent-primary) font-bold text-3xl">
          Préci
        </h2>
      </Link>

      <ul className="hidden md:flex gap-4 text-sm cursor-pointer">
        <li className="hover:underline w-fit h-fit p-2 rounded-2xl">
          <Link href='#meet-preci'>Meet Préci</Link>
        </li>
        <li className="hover:underline w-fit h-fit p-2 rounded-2xl active:underline">
          <Link href='/blog'>Blog</Link>
        </li>
        <li className="hover:underline w-fit h-fit p-2 rounded-2xl active:underline">
          <Link href='/about'>About</Link>
        </li>
      </ul>

      {mounted && (
        menuOpen
          ? <X color="#6B7280" onClick={toggleMenu} />
          : <Menu color="#6B7280" onClick={toggleMenu} className="md:hidden"/>
      )}
    </div>
  )
}

export default Nav