'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

function CallToAction({ blog }) {

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBanner(true)
    }, 12000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`w-[35%] fixed right-5 bottom-4 z-10 h-fit p-6 rounded-2xl text-lg
      shadow-2xl flex flex-col gap-3 bg-white
      transition-all duration-700 ease-out
      ${showBanner 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >

      <div className="flex flex-row gap-2 w-full justify-center items-center">

        <div className="relative w-1/3 h-full">
          {blog.image_url && (
            <div className="relative w-full h-48 flex justify-center items-center">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                unoptimized
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="relative w-2/3 h-full">
          {blog.cta}
        </div>

      </div>

      <div className="w-full flex gap-3">

        <button className="p-2 rounded-lg w-1/2 h-fit
        text-white bg-(--accent-primary)
        hover:opacity-70 transition">
          <Link href="/auth/login">
            Upload
          </Link>
        </button>

        <button className="p-2 rounded-lg w-1/2 h-fit
        text-white bg-black
        hover:opacity-70 transition">
          <Link href="/auth/login#meet-preci">
            Learn More
          </Link>
        </button>

      </div>

    </div>
  )
}

export default CallToAction