import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  // Verify the payload came from Paystack
  const expectedSig = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  const sigBuffer      = Buffer.from(signature ?? "");
  const expectedBuffer = Buffer.from(expectedSig);

  const valid =
    sigBuffer.length === expectedBuffer.length &&
    timingSafeEqual(sigBuffer, expectedBuffer);

  if (!valid) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    return Response.json({ ok: true }); // acknowledge other event types
  }

  const { reference, metadata, amount } = event.data;
  const { summaryId, userId } = metadata ?? {};

  if (!summaryId || !userId) {
    console.error("Webhook missing metadata:", event.data);
    return Response.json({ error: "Missing metadata" }, { status: 400 });
  }

  // Look up the reference we stored at initiation
  const { data: pendingRef } = await supabase
    .from("payment_references")
    .select("id, amount_zar, summary_id, user_id")
    .eq("reference", reference)
    .maybeSingle();

  if (!pendingRef) {
    console.error("Unknown reference:", reference);
    return Response.json({ error: "Unknown reference" }, { status: 400 });
  }

  // Verify the amount matches what we stored — catches tampered webhooks
  const expectedKobo = Math.round(pendingRef.amount_zar * 100);
  if (amount !== expectedKobo) {
    console.error("Amount mismatch — expected:", expectedKobo, "got:", amount);
    return Response.json({ error: "Amount mismatch" }, { status: 400 });
  }

  // Mark as paid (idempotent — .eq("paid", false) prevents double-processing)
  const { error } = await supabase
    .from("summaries")
    .update({ paid: true, paid_at: new Date().toISOString() })
    .eq("id", pendingRef.summary_id)
    .eq("user_id", pendingRef.user_id)
    .eq("paid", false);

  if (error) {
    console.error("Failed to mark summary as paid:", error);
    return Response.json({ error: "DB update failed" }, { status: 500 });
  }

  await supabase.from("payment_references").delete().eq("id", pendingRef.id);

  return Response.json({ ok: true });
}