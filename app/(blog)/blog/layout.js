import { DM_Sans, Inter } from "next/font/google";
import "@/app/globals.css";
import BlogNav from "@/app/_components/BlogNav";




const Primaryfont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const HeadingsFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});


export default async function RootLayout({ children }) {
   

  return (
   
  <html lang="en">
         <body
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
       <BlogNav/>
         {children}
    
        
  
      </body>

  </html>
 
 
    
      
  
  );
}
