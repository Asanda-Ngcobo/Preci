import Script from "next/script";


import { getSummaries } from "@/app/_lib/supabase/apis";
import SideBar from "@/app/_components/SideBar";
import Main from "@/app/_components/Main";
import SearchView from "@/app/_components/SearchView";
import { createClient } from "@/app/_lib/supabase/server";


export const metadata = {
  metadataBase: new URL("https://preci.co.za"),
  title: {
    default: "Preci | Understand Contracts Before They Cost You Money",
    template: "%s | Preci",
  },
  description:
    "Préci breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms before they cost you thousands of rands.",
};

export async function generateStaticParams() {
  return [
    { slug: "phone" },
    { slug: "housing" },
    { slug: "insurance" },
    { slug: "gym" },
    { slug: "car" },
    { slug: "credit-score" },
  ];
}

export default async function Page({ params }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const mysummaries = user ? await getSummaries(user.id) : [];

  return (
    <div className="flex">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Preci",
              "url": "https://preci.co.za",
              "logo": "https://preci.co.za/icon.png",
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Preci",
              "applicationCategory": "LegalApplication",
              "operatingSystem": "Web",
              "url": "https://preci.co.za",
              "description":
                "AI-powered contract analysis platform helping consumers understand agreements before signing.",
            },
          ]),
        }}
      />

      {user ? (
        <SideBar data={user ?? null} userSummaries={mysummaries} />
      ) : null}

      <Main data={user ?? null} params={params} />

      <SearchView />
    </div>
  );
}