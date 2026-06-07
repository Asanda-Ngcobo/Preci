import Script from "next/script";
import LoginClient from "../_components/_auth_components/LoginClient";

import HeroImage from "../_components/HeroImage";

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





function Page() {
  return (
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
]
),
  }}
/>
      <LoginClient />
      {/* <Testimonials/> */}
      <HeroImage/>
    </div>
  )
}

export default Page

