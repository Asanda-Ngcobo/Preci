'use client'

import { useState } from "react"
import { useMenu } from "../providers/MenuProvider"
import { X } from "@deemlol/next-icons"

function SearcBar() {
    const [query, setQuery] = useState('')
    const {toggleSearch} = useMenu()
    return (
        <form className="w-[90%] mx-auto h-15 border-b
        flex justify-between items-end border-b-(--text-secondary)">
         <input
  type="text"
  placeholder="Search Your Summaries..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="
    w-full mx-3
    border-0
    outline-none
    focus:outline-none
    focus:ring-0
    focus:border-0
    active:outline-none
  "
/>

            <div className="w-8 h-8 rounded-full
            flex justify-center items-center
            hover:bg-(--text-secondary) cursor-pointer
            " 
            onClick={()=> toggleSearch()}>
                 <X/>
            </div>
           

            
        </form>
    )
}

export default SearcBar
