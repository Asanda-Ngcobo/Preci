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
export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | User",
      
    template: "%s | Preci",
  },
}

export default function RootLayout({ children }) {
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
