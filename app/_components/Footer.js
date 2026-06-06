'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import Instagram from '@/public/icons8-instagram-ios-17-filled/icons8-instagram-100.png'
import Facebook from '@/public/icons8-facebook-ios-17-filled/icons8-facebook-100.png'
import TikTok from '@/public/icons8-tiktok-ios-17-filled/icons8-tiktok-100.png'
import Insurance from "@/public/InsuranceStraight.png"
const blogPages = [
  {id : 1,
    link: `/blog/insurance`,
    name: 'Insurance'
  },
  {id : 2,
    link: `/blog/phone`,
    name: 'Phone & WiFi'
  },
  {id : 3,
    link: `/blog/housing`,
    name: 'Housing'
  },
  {id : 4,
    link: `/blog/car`,
    name: 'Car Finance'
  },
  {id : 5,
    link: `/blog/credit`,
    name: 'Credit'
  },
  {id : 6,
    link: `/blog/gym`,
    name: 'Gym'
  },

   {id : 7,
    link: `/blog/employment`,
    name: 'Employment'
  },
]

const preci = [
  {id : 1,
    link: `/about`,
    name: 'About'
  },
  {id : 2,
    link: `/blog`,
    name: 'Blog'
  },

    {id : 3,
    link: `/contact-us`,
    name: 'Contact Us'
  },

]
function Footer() {
  const [year, setYear] = useState(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="w-screen text-gray-100 mx-auto h-fit bg-black">
      <div className="flex flex-col justify-between  my-10">

        <div className='flex flex-col md:flex-row my-10 w-[90%] mx-auto gap-20'>
         <div className='w-[30%] h-fit bg-gray-400 rounded-3xl hidden'>
          <Image src={Insurance} alt='insurance summary picture'/>
         </div>
          <div className='flex gap-30 my-5 md:w-[90%] mx-auto '>

            <div>
              <h3 className='text-gray-400'>Learn</h3>
  {blogPages.map(function(page){
              return <ul key={page.id} className='flex flex-col w-fit h-fit hover:underline'>
              <li className="py-2 text-lg"><Link href={page.link}>{page.name}</Link></li>
            </ul>
            })}
            </div>

          <div>
         <h3 className='text-gray-400'>        Préci</h3>
 {preci.map(function(pre){
              return <ul key={pre.id} className='flex flex-col w-fit h-fit hover:underline'>
              <li className="py-2 text-lg"><Link href={pre.link}>{pre.name}</Link></li>
            </ul>
            })}
          </div>
            
          </div>
          <ul className="flex flex-col gap-2 mt-10">
            <h3 className='text-gray-400'>Socials</h3>
            {/* <li className=" w-15 h-15 rounded-xl flex
            justify-center items-center hover:bg-gray-400
            bg-white"><Link href=''><Image src={Instagram} alt='' width={50}/></Link></li> */}
             <li className=" py-2 hover:bg-gray-400
            "><Link href='https://www.facebook.com/profile.php?id=61590057382689'>
             Facebook</Link></li>
              <li className=" py-2 hover:bg-gray-400
          "><Link href='https://www.tiktok.com/@preci_ai'>TikTok</Link></li>
          </ul>

         
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <ul className="flex text-xs gap-4 flex-row mt-6 mb-4">
            <li className="px-2"><Link href='/terms'>Terms Of Service</Link></li>
            <li className="px-2"><Link href='/privacy'>Privacy Policy</Link></li>
            <li className="px-2"><Link href='/refund'>Refund Policy</Link></li>
          </ul>
         
      </div>
   <h3 className='text-center'>&copy; {year ?? ''} Préci. All Rights Reserved.</h3>
      <h2 className="font-sans text-gray-600 text-center font-bold w-screen
      md:text-[400px] xl:text-[500px] text-[150px]">
        Préci
      </h2>
    </div>
  )
}

export default Footer