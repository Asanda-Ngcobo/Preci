'use client'

import { Instagram, Linkedin } from "@deemlol/next-icons"

function Footer() {

    const thisYear = new Date().getFullYear()
    return (
        <div className="md:flex w-[90%] mx-auto ">
            <div className="flex flex-col justify-between">
                   <div >
                
              <h3>&copy; {thisYear}  Préci. All Rights Reserved.</h3> 
              <ul className="flex flex-row gap-2">
                <li className="px-2"><Instagram/></li>
                <li className="px-2"><Linkedin/></li>
              </ul>
            </div>
                    
                </div>
         
            
        </div>
    )
}

export default Footer
