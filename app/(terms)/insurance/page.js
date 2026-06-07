import LoginClient from "@/app/_components/_auth_components/LoginClient"
import LoginInsurance from "@/app/_components/_auth_components/LoginInsurance"
import MeetPreciInsurance from "@/app/_components/_auth_components/MeetPreciInsurance"

import InsuranceImage from "@/app/_components/InsuranceImage"
import Script from "next/script";




export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | AI Insurance Policy Checker & Review",
      
    template: "%s | Preci",
  },

  description:
    `
 Upload your insurance policy and let Preci identify exclusions, waiting periods, cancellation terms, claim requirements, 
 payout conditions, and hidden clauses before they cost you money."`,

keywords: [
  "insurance policy review",
  "insurance policy checker",
  "insurance contract analysis",
  "insurance policy summary",
  "insurance exclusions",
  "insurance waiting periods",
  "insurance claim rejection",
  "insurance claim denied",
  "hidden insurance clauses",
  "insurance policy risks",
  "life insurance policy review",
  "funeral cover policy review",
  "car insurance policy review",
  "medical aid policy review",
  "insurance cancellation terms",
  "insurance cooling off period",
  "insurance benefits and exclusions",
  "insurance payout conditions",
  "understand insurance policy",
  "consumer protection South Africa",
  "insurance rights South Africa",
  "insurance policy South Africa",
  "insurance claim requirements",
  "policy terms and conditions",
  "insurance fine print"
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
    canonical: "/insurance",
  },

  openGraph: {
    title:
      "Preci | Review Your Policy Before You Lose Your Ability To Claim",

    description:
         `
 Upload your insurance policy and let Preci identify exclusions, waiting periods, cancellation terms, claim requirements, 
 payout conditions, and hidden clauses before they cost you money.`,


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
       "Preci | Understand Your Insurance Policies Before You Lose Money",

    description:
      `
 pload your insurance policy and let Preci identify exclusions, waiting periods, cancellation terms, claim requirements, 
 payout conditions, and hidden clauses before they cost you money.`,

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
    "name": "Insurance Policy Review",
    "url": "https://preci.co.za/insurance",
    "description": "AI-powered insurance policy analysis for South African policy holders."
  }
]
),
  }}
/>
      <LoginInsurance />
      {/* <Testimonials/> */}
      <InsuranceImage/>
    </div>
    <MeetPreciInsurance/>
    </>
   
  )
}

export default Page

