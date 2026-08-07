import { createClient } from "@/app/_lib/supabase/server";

export async function GET(req, { params }) {
  const { summaryId } = await params;
const supabase = await createClient()
  console.log("[referral-status] summaryId:", summaryId);

  const { data: summary, error } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", summaryId)
    .single(); // .single() errors on no row; 
    // .maybeSingle() returns null safely

  console.log("[referral-status] row:", summary, "| error:", error);

  if (error) {
    console.error("[referral-status] Supabase error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }

  // Row doesn't exist yet — return a safe default rather than 404
  if (!summary) {
    return Response.json({ discount: false, price_zar: null });
  }

  
  const discountActive = summary.referral_used && summary.discounted_price_zar != null;
  const price = discountActive ? summary.discounted_price_zar : summary.price_zar;

  return Response.json({
    discount: discountActive,
    price_zar: price,
  });
}