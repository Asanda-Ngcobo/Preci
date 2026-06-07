import LoginHousing from "@/app/_components/_auth_components/LoginHousing"
import MeetPreci from "@/app/_components/_auth_components/MeetPreci"

import HousingImage from "@/app/_components/HousingImage"
import Script from "next/script";


export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | Understand Your Lease Before It Costs You Money",
      
    template: "%s | Preci",
  },

  description:
    `
  Upload your lease agreement and let Preci identify rent increase clauses, 
  notice periods, landlord access rights,
   early termination penalties, deposits, 
   and hidden rental risks before lack of understanding costs your thousands of rands`,

 keywords: [
  "lease agreement review",
  "rental agreement review",
  "rental contract checker",
  "lease contract analysis",
  "rent increase clause",
  "early termination penalty",
  "landlord right of access",
  "rental agreement South Africa",
  "tenant rights South Africa",
  "lease cancellation",
  "rental contract risks",
  "rental agreement summary",
  "housing contract review",
  "rental property agreement",
  "consumer protection South Africa",
  "renting in South Africa"
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
    canonical: "/housing",
  },

  openGraph: {
    title:
      "Preci| Review Your Lease Agreement Before You Are Liable For Thousands of Rands",

    description:
         `
  Understand rent increases, notice periods, landlord rights, deposits, penalties, and hidden clauses in your lease agreement.`,


    url: "https://preci.co.za",

    siteName: "Preci",

    locale: "en_ZA",

    type: "website",

    images: [
      {
        url: "https://preci.co.za/og-image.png",
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
      `
  Upload your lease agreement and let Preci identify rent increase clauses, 
  notice periods, landlord access rights,
   early termination penalties, deposits, 
   and hidden rental risks before lack of understanding costs your thousands of rands`,

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










function Page() {
  return (
    <>
      <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
  [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Preci",
    "url": "https://preci.co.za",
    "logo": "https://preci.co.za/icon.png"
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Preci",
    "applicationCategory": "LegalApplication",
    "operatingSystem": "Web",
    "url": "https://preci.co.za",
    "description": "AI-powered contract analysis platform helping consumers understand agreements before signing."
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Lease Agreement Review",
    "url": "https://preci.co.za/housing",
    "description": "AI-powered lease agreement analysis for South African tenants."
  }
]
),
  }}
/>
      <LoginHousing />
   
      <HousingImage/>
    </div>
    <MeetPreci/>
 
    </>
   )
}

export default Page

