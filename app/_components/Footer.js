'use client'

import { Instagram, Linkedin } from "@deemlol/next-icons"
import Link from "next/link"

function Footer() {

    const thisYear = new Date().getFullYear()
    return (
        <div className="md:flex w-[90%] mx-auto ">
            <div className="flex flex-col justify-between">
                   <div >
                
              <h3>&copy; {thisYear}  Préci. All Rights Reserved.</h3> 
              <ul className="flex flex-row gap-2 mt-10">
                <li className="px-2"><Instagram/></li>
                <li className="px-2"><Linkedin/></li>
              
              </ul>

              <ul className="flex text-xs gap-4 flex-row mt-6 mb-4">
  <li className="px-2"><Link href='/terms'>Terms Of Service</Link> </li>
                <li className="px-2"><Link href='/privacy'>Privacy Policy</Link> </li>
                 <li className="px-2"><Link href='/refund'>Refund Policy</Link> </li>
              </ul>
            </div>
                    
                </div>
         
            
        </div>
    )
}

export default Footer
