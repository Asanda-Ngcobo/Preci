'use client'

import { Menu, X } from "@deemlol/next-icons"
import { useMenu } from "../providers/MenuProvider"

function Nav() {
  const { toggleMenu, menuOpen } = useMenu()

  return (
    <div className="h-15 flex top-0 justify-between items-center w-full">
      <div className="flex md:hidden" onClick={toggleMenu}>
        {menuOpen ? <X /> : <Menu />}
      </div>
    </div>
  )
}

export default Nav