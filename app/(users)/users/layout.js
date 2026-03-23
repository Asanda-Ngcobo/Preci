import { DM_Sans, Inter } from "next/font/google";
import "@/app/globals.css";

import { MenuProvider } from "@/app/providers/MenuProvider";
import Script from "next/script";


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
    
        <MenuProvider>
         {children}
        </MenuProvider>
           <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </body>

  </html>
 
    
      
  
  );
}
