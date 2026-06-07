import { DM_Sans, Inter } from "next/font/google";
import "@/app/globals.css";
import BlogNav from "@/app/_components/BlogNav";
import Discount from "@/app/_components/Discount";
import Footer from "@/app/_components/Footer";
import Script from "next/script";




const Primaryfont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const HeadingsFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Blog', 
  description: `Preci Blog teaches consumers about the things they should look out for before signing any phone contract,
  lease agreement, gym membership, car finance, car insurance, phone insurance, life insurance, personal loan, store account, car tracker, etc. 
  `
}

export default async function RootLayout({ children }) {
   

  return (
   
  <html lang="en">
    <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-070YXLFQYG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-070YXLFQYG');
          `}
        </Script>
    </head>
         <body
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
        <Discount/>
       <BlogNav/>
         {children}
    
        <Footer/>
  
      </body>

  </html>
 
 
    
      
  
  );
}
