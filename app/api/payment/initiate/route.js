
import { createClient } from "@/app/_lib/supabase/server";
import { cookies } from "next/headers";
export async function POST(req) {
  const cookieStore = await cookies();
  const supabase = await createClient(
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { summaryId } = await req.json();
  if (!summaryId) {
    return Response.json({ error: "Missing summaryId" }, { status: 400 });
  }

  const { data: summary, error: summaryError } = await supabase
    .from("summaries")
    .select("price_zar, discounted_price_zar, referral_used, user_id, paid")
    .eq("id", summaryId)
    .single();

  if (summaryError || !summary) {
    return Response.json({ error: "Summary not found" }, { status: 404 });
  }

  if (summary.user_id !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (summary.paid) {
    return Response.json({ error: "Already paid" }, { status: 400 });
  }

  // Canonical price — backend decides, not the client
  const discountActive = summary.referral_used && summary.discounted_price_zar != null;
  const amountZar  = discountActive ? summary.discounted_price_zar : summary.price_zar;
  const amountKobo = Math.round(amountZar * 100);

  const reference = `${summaryId}-${Date.now()}`;

  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email:    user.email,
      amount:   amountKobo,
      currency: "ZAR",
      reference,
      metadata: { summaryId, userId: user.id },
    }),
  });

  const paystackData = await paystackRes.json();

  if (!paystackData.status) {
    console.error("Paystack init failed:", paystackData);
    return Response.json({ error: "Payment initiation failed" }, { status: 500 });
  }

  // Store reference so the webhook can verify amount + ownership
  await supabase.from("payment_references").insert({
    reference,
    summary_id: summaryId,
    user_id:    user.id,
    amount_zar: amountZar,
  });

  return Response.json({
    authorization_url: paystackData.data.authorization_url,
    reference,
  });
}