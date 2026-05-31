import { DM_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "@/app/globals.css";

import { MenuProvider } from "@/app/providers/MenuProvider";

import Footer from "@/app/_components/Footer";
import { Toaster } from "react-hot-toast";
import Nav from "../_components/_auth_components/AuthNav";
import MobileMenu from "../_components/MobileNav";
import Discount from "../_components/Discount";


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
   
  <html lang="en">
       <body
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
         <Toaster position="top-center" 
         reverseOrder={false} />
        <MenuProvider>
          <MobileMenu/>
          <Discount/>
        <Nav/>
         {children}
    
     <Footer/>
        </MenuProvider>
      </body>

  </html>
 
   
      
  
  );
}
