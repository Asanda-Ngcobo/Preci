'use client'
import Image from "next/image"
import Hero  from "@/public/Summary.png"

function HeroImage() {
    return (
        <div className="w-[90%] mx-auto h-full md:w-[50%]
     md:mx-0 md:h-[72vh]  md:flex
     items-center justify-center rounded-bl-3xl bg-(--accent-secondary)">
            <Image src={Hero} alt="Preci ai Summary" width={800}
            className="rounded-2xl  mx-auto"/>
        </div>
    )
}

export default HeroImage
