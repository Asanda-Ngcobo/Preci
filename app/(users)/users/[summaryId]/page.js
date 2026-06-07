import { getSummaries, getSummary } from "@/app/_lib/supabase/apis";
import SummaryPreview from "@/app/_components/summaryPreview";
import { createClient } from "@/app/_lib/supabase/server";

const formatContractType = (type) => {
  if (!type) return "Contract";

  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * 🚫 BLOCK GOOGLE INDEXING
 * BUT still allow metadata for UI + sharing previews
 */
export async function generateMetadata({ params }) {
  const { summaryId } = await params;

  const summary = await getSummary(summaryId);

  const contractType = formatContractType(summary?.contract_type);
 

  return {
    title: `${contractType} Summary | Preci`,

    description: `View your AI-generated breakdown of this ${contractType.toLowerCase()} including risks, fees, and cancellation terms.`,

    metadataBase: new URL("https://preci.co.za"),

    robots: {
      index: false,
      follow: false,
      nocache: true,
    },

    openGraph: {
      title: `${contractType} Summary |`,
      description: `AI breakdown of your ${contractType.toLowerCase()} using Preci.`,
      url: `https://preci.co.za/users/${summaryId}`,
      siteName: "Preci",
      type: "article",
      images: [
        {
          url: "https://preci.co.za/og-image.png",
          width: 1200,
          height: 630,
          alt: "Preci Contract Summary",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${contractType} Summary | Preci`,
      description: `AI breakdown of your ${contractType.toLowerCase()} using Preci.`,
      images: ["https://preci.co.za/og-image.png"],
    },
  };
}

/**
 * 🧠 Page
 */
export default async function UserSummaryPage({ params }) {
  const { summaryId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>Please sign in to view this summary.</p>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_discount_used, surveyed")
    .eq("id", user.id)
    .single();


  const summary = await getSummary(summaryId);
   const mysummaries = await getSummaries(user.id)

  if (!summary) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>Summary not found.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <SummaryPreview summary={summary} profile={profile}
      mysummaries={mysummaries} />
    </div>
  );
}