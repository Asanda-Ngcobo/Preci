import { DM_Sans, Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { MenuProvider } from "../providers/MenuProvider";
import Nav from "../_components/_auth_components/AuthNav";
import MeetPreci from "../_components/_auth_components/MeetPreci";
import Footer from "../_components/Footer";
import Discount from "../_components/Discount";
import MobileMenu from "../_components/MobileNav";
import Script from "next/script";
import { createClient } from "../_lib/supabase/server";






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
      "Preci | Understand Contracts Before They Cost You Money",
      
    template: "%s | Preci",
  },

  description:
    "Préci breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",

 keywords: [
  "contract checker",
  "contract review",
  "contract analysis",
  "understand contracts",
  "hidden contract clauses",
  "phone contract cancellation",
  "insurance policy review",
  "cell phone contract",
  "contract auto renewal",
  "consumer rights South Africa",
  "CPA South Africa",
  "car finance agreement",
  "lease agreement review",
  "legal document summary",
  "contract risks",
  "contract red flags",
  "termination clauses",
  "subscription contract",
  "service agreement review",
  "consumer protection"
],

  applicationName: "Preci",

  authors: [
    {
      name: "Asanda Ngcobo",
      url: "https://preci.co.za",
    },
  ],

  creator: "Asanda Ngcobo",

  publisher: "Preci",

  category: "consumer protection",

  classification: "Consumer Protection App",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Preci | Understand Contracts Before They Cost You Money",

    description:
       "Préci breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",


    url: "https://preci.co.za",

    siteName: "Preci",

    locale: "en_ZA",

    type: "website",

    images: [
      {
        url: "ttps://preci.co.za/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preci consumer protection app",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
       "Preci | Understand Contracts Before They Cost You Money",

    description:
      "Préci breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",


    images: ["https://preci.co.za/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  other: {
    "theme-color": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};




export default async function RootLayout({ children }) {

  const supabase = await createClient()
  
  // const { data: {user}, error } = await supabase.auth.getClaims()
  //  if (error || !user?.claims) {
  //   redirect('/auth/login')
  //  }
  
   const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
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
        <Toaster position="top-center" 
         reverseOrder={false} />
        <MenuProvider>
          {/* <MobileMenu/> */}
          {/* <Discount/> */}
          {!user && <Nav/>}
         {children}

  
     <Footer/>
        </MenuProvider>
       
      </body>
      
    </html>
  );
}
