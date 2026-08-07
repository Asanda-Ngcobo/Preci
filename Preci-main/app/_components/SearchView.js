'use client'

import { useMenu } from "../providers/MenuProvider"
import SearchUI from "./SearchUI"

function SearchView() {
    const { searchOpen} = useMenu()
    return (
        <div  className={`fixed 
            inset-0 md:bg-black/40 transition-all
            bg-white
         duration-300 z-50
         flex justify-center items-center ${
        searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
     >

            <SearchUI/>
            
        </div>
    )
}

export default SearchView
