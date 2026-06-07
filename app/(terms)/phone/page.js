import LoginPhone from "@/app/_components/_auth_components/LoginPhone"
import MeetPreci from "@/app/_components/_auth_components/MeetPreci"
import MeetPreciPhone from "@/app/_components/_auth_components/MeetPreciPhone"
import PhoneImage from "@/app/_components/PhoneImage"
import Script from "next/script";


export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | AI Phone & Data Contract Checker & Review",
      
    template: "%s | Preci",
  },

  description:
    `
 Upload your insurance policy and let Preci identify exclusions, waiting periods, cancellation terms, claim requirements, 
 payout conditions, and hidden clauses before they cost you money."`,

keywords: [
  "phone contract review",
  "cell phone contract review",
  "phone contract checker",
  "mobile contract analysis",
  "phone contract South Africa",
  "cell phone contract South Africa",
  "Vodacom contract review",
  "MTN contract review",
  "Telkom mobile contract",
  "Cell C contract review",
  "phone contract cancellation",
  "mobile contract cancellation",
  "contract cancellation fees",
  "early termination fees",
  "device finance agreement",
  "phone upgrade contract",
  "phone contract auto renewal",
  "automatic contract renewal",
  "mobile contract terms",
  "hidden phone contract clauses",
  "cell phone contract risks",
  "out of bundle charges",
  "airtime and data charges",
  "consumer rights South Africa",
  "CPA contract cancellation",
  "understand phone contract"
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
    canonical: "/phone",
  },

  openGraph: {
    title:
      "Preci | Review Your Phone Contract Before You Are Lose Hundreds of Rands",

    description:
         `
 Upload your phone contract and let Preci identify auto-renewal clauses, cancellation fees, upgrade terms, device financing obligations, out-of-bundle charges, and hidden contract risks before they cost you money.`,


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
       "Preci | Understand Phone Contract Before You Are Charged Hundreds of Rands",

    description:
      `
  Upload your phone contract and let Preci identify auto-renewal clauses, cancellation fees, upgrade terms, device financing obligations, out-of-bundle charges, and hidden contract risks before they cost you money.`,

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
    "description": "AI-powered contract analysis platform helping consumers understand agreements before they lose money."
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Phone or/and Data Contract Review",
    "url": "https://preci.co.za/phone",
    "description": "AI-powered Phone & WiFi contract analysis for South African Phone or/and WiFi Subscribers."
  }
]
),
  }}
/>
      <LoginPhone />
      {/* <Testimonials/> */}
      <PhoneImage/>
    </div>
    <MeetPreciPhone/>
    </>
  
  )
}

export default Page

