import Script from "next/script";

import { createClient } from "../_lib/supabase/server";
import SideBar from "../_components/SideBar";
import Main from "../_components/Main";
import SearchView from "../_components/SearchView";
import { getReviews, getSummaries } from "../_lib/supabase/apis";
import OnboardingCards from "../_components/OnBoardingCards";



export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | AI Software For South African Consumers",
      
    template: "%s | Preci",
  },

  description:
    "Préci AI breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",

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
      "Preci | AI Software For South African Consumers",

    description:
       "Préci AI breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",


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
    "Preci | AI Software For South African Consumers",

    description:
      "Préci AI breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms,before they cost you thousands of rands.",


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



export default async function Home() {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

const mysummaries = user
  ? await getSummaries(user.id)
  : [];

   const reviews = await getReviews()
return (
  <div className="flex"
  >
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
    {user ? <SideBar data={user ?? null} userSummaries={mysummaries} />: ''}
    {/* <Main data={user ?? null} /> */}
    <OnboardingCards reviews={reviews} data={user}/>
    <SearchView />
    
  </div>
);
}
