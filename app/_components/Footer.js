'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

function Footer() {
  const [year, setYear] = useState(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="w-[90%] mx-auto h-fit">
      <div className="flex flex-col justify-between">
        <div>
          <h3>&copy; {year ?? ''} Préci. All Rights Reserved.</h3>

          <ul className="flex flex-col gap-2 mt-10">
            <li className="px-2">Instagram</li>
            <li className="px-2">Facebook</li>
            <li className="px-2">TikTok</li>
          </ul>

          <ul className="flex text-xs gap-4 flex-row mt-6 mb-4">
            <li className="px-2"><Link href='/terms'>Terms Of Service</Link></li>
            <li className="px-2"><Link href='/privacy'>Privacy Policy</Link></li>
            <li className="px-2"><Link href='/refund'>Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <h2 className="font-sans text-(--accent-primary) text-center font-bold
      md:text-5xl text-[150px]">
        Préci
      </h2>
    </div>
  )
}

export default Footer