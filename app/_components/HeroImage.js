'use client'
import Image from "next/image"
import Hero from "@/public/Summary.png"

function HeroImage() {
  return (
    <div className="w-[90%] mx-auto h-full md:w-[50%] md:mx-0 md:h-[72vh] md:flex items-center justify-center rounded-3xl md:rounded-bl-3xl md:rounded-tl-3xl md:rounded-br-none rounded-tr-none bg-(--accent-secondary)">
      <Image src={Hero} alt="Preci ai Summary" width={800} className="rounded-2xl mx-auto" />
    </div>
  )
}

export default HeroImage