import { DM_Sans, Inter } from "next/font/google";
import "@/app/globals.css";

import { MenuProvider } from "@/app/providers/MenuProvider";


const Primaryfont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const HeadingsFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
   

      <div
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
    
   
         {children}
  
      </div>
 
    
      
  
  );
}
