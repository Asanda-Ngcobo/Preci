'use client'
import { DM_Sans } from "next/font/google";

const HeadingsFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
function CardHeader({children}) {
    return (
        <h1 className={`text-center ${HeadingsFont.className}`}>
          {children}
            
        </h1>
    )
}

export default CardHeader
