import { DM_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "@/app/globals.css";

import Nav from "@/app/_components/_auth_components/AuthNav";
import { MenuProvider } from "@/app/providers/MenuProvider";
import MeetPreci from "@/app/_components/_auth_components/MeetPreci";
import Footer from "@/app/_components/Footer";
import { Toaster } from "react-hot-toast";

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
      
         {children}
    
     <Footer/>
        </MenuProvider>
      </body>

  </html>
 
   
      
  
  );
}
