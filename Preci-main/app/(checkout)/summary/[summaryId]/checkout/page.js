import { redirect } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/server";
import Checkout from "./Checkout";

export default async function CheckoutPage({
  params,
  searchParams,
}) {
  const { summaryId } = await params;
  const { token } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("summaries")
    .select("*")
    .eq("id", summaryId);

  if (user) {
    query = query.eq("user_id", user.id);
  } else {
    if (!token) {
      redirect("/");
    }

    query = query
      .is("user_id", null)
      .eq("summary_token", token);
  }

  const { data: summary } = await query.single();

  if (!summary) {
    redirect("/error");
  }

  // Prevent paying twice
  if (summary.paid) {
    if (user) {
      redirect(`/users/${summaryId}`);
    }

    redirect(`/${summaryId}?token=${token}`);
  }

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("referral_discount_used")
      .eq("id", user.id)
      .single();

    profile = data;
  }

  return (
    <Checkout
      summary={summary}
      profile={profile}
      user={user}
      token={token}
    />
  );
}