'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Discount from "./Discount"


function CallToAction({ blog }) {
  const [showBanner, setShowBanner] = useState(false)

  const ctaConfig = {
  insurance: {
    href: "/insurance",
    label: "Check Insurance Policy",
  },
  employment: {
    href: "/employment",
    label: "Check Employment Contract",
  },
   Phone: {
    href: "/phone",
    label: "Check the contract",
  },
  Housing: {
    href: "/Housing",
    label: "Check Lease Agreement",
  },
}

const cta = ctaConfig[blog.type] || {
  href: "/auth/login",
  label: "Upload Agreement",
}
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBanner(true)
      document.body.style.overflow = "hidden"
    }, 12000)

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = "auto"
    }
  }, [])

  const closeBanner = () => {
    setShowBanner(false)
    document.body.style.overflow = "auto"
  }

  if (!showBanner) return null

  return (
    <div className="fixed text-white
    inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeBanner}
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full h-full
          md:h-auto md:max-w-3xl
         bg-black
          md:rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-in fade-in zoom-in duration-300
        "
      >
        {/* Close Button */}
        <button
          onClick={closeBanner}
          className="
            absolute top-0 right-4 z-20
            w-10 h-10 rounded-full
            bg-black/10 hover:bg-black/20
            transition
            flex justify-center items-center cursor-pointer
          "
        >
          ✕
        </button>

        <div className="flex flex-col  h-full">
          
          {/* Image */}
          
            <div className="relative h-72
             md:h-auto ">
          
              <Discount/>
            </div>
          

          {/* Content */}
          <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
         
            
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              Stop Guessing What Your Contract Says
            </h2>

            <div className="mt-4 text-gray-600 text-lg md:text-xl">
              {blog.cta}
            </div>

            <div className="mt-8 flex flex-col gap-4">
           <Link
  href={cta.href}
  className="
    flex-1 text-center
    px-6 py-5 rounded-xl
    bg-(--accent-primary)
    text-white font-medium
    hover:opacity-90 transition
  "
>
  {cta.label}
</Link>

              {/* <Link
                href="/#meet-preci"
                className="
                  flex-1 text-center
                  px-6 py-4 rounded-xl
                  bg-black
                  text-white font-medium
                  border-white
                  hover:opacity-90 transition
                "
              >
                Learn More
              </Link> */}
            </div>

            <p className="mt-4 text-sm text-center text-gray-500">
              Join thousands of South Africans making sense of
               their agreements before the lack of understanding costs the thousands of rands.
            </p>
             <p className="text-center text-md py-2
          underline text-gray-500 cursor-pointer"
          onClick={closeBanner}>Not yet</p>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default CallToAction