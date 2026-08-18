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
        {/* Meta Pixel Code */}
<Script
  id="meta-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
      }(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '1018566787546679');
      fbq('track', 'PageView');
    `,
  }}
/>

<noscript>
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    src="https://www.facebook.com/tr?id=1018566787546679&ev=PageView&noscript=1"
    alt=""
  />
</noscript>
{/* End Meta Pixel Code */}
    </head>
      <body
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
    
        <MenuProvider>
         {children}
        </MenuProvider>
        
      </body>

  </html>
 
    
      
  
  );
}
