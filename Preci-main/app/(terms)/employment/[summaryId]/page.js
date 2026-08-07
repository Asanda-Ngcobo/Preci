import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/server";
import SummaryPreview from "@/app/_components/summaryPreview";
import { getGuestSummary, getSummaries, getSummary } from "@/app/_lib/supabase/apis";


const formatContractType = (type) => {
  if (!type) return "Contract";

  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export async function generateMetadata({ params }) {
  const { summaryId } = await params;

  const supabase = await createClient();

  const { data: summary } = await supabase
    .from("summaries")
    .select("contract_type")
    .eq("id", summaryId)
    .single();

  const contractType = formatContractType(summary?.contract_type);

  return {
    title: `${contractType} Summary | Preci`,
    description: `AI-generated summary of your ${contractType.toLowerCase()}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SummaryPage({
  params,
  searchParams,
}) {
  const { summaryId } = await params;
  const { token } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const { data: summary } = await supabase
  //   .from("summaries")
  //   .select("*")
  //   .eq("id", summaryId)
  //   .single();

  // if (!summary) {
  //   notFound();
  // }

  /**
   * OWNER OR GUEST ACCESS
   * 
   */

  let summary;
if (user) {
    summary = await getSummary(summaryId);
} else {
    summary = await getGuestSummary(summaryId, token);
}

  /**
   * Profile
   */

  let profile = null;
  let mySummaries = [];

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("surveyed, referral_discount_used")
      .eq("id", user.id)
      .single();

    profile = data;

    // const { data: summaries } = await supabase
    //   .from("summaries")
    //   .select("id")
    //   .eq("user_id", user.id);

   mySummaries = await getSummaries(profile.id) ?? [];
  }

  
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SummaryPreview
        summary={summary}
        profile={profile}
        mysummaries={mySummaries}
        user={user}
        token={token}
      />
    </div>
  );
}