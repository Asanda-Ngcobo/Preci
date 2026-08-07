import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      console.error("Webhook: missing x-paystack-signature header");
      return Response.json({ error: "Missing signature" }, { status: 401 });
    }

    const expectedSig = createHmac(
      "sha512",
      process.env.PAYSTACK_SECRET_KEY
    )
      .update(rawBody)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");

    // timingSafeEqual throws if buffer lengths differ — guard against that first
    const validSig =
      sigBuf.length === expectedBuf.length &&
      timingSafeEqual(sigBuf, expectedBuf);

    if (!validSig) {
      console.error("Webhook: signature mismatch", { signature, expectedSig });
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    let event;
    try {
      event = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("Webhook: failed to parse JSON body", parseErr);
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (event.event !== "charge.success") {
      return Response.json({ ok: true });
    }

    const { reference, metadata, amount } = event.data ?? {};
    const { summaryId } = metadata ?? {};



    if (!reference || !summaryId) {
      console.error("Webhook: missing reference or summaryId", { reference, metadata });
      return Response.json({ error: "Missing metadata" }, { status: 400 });
    }

    // get reference
    const { data: pending, error: pendingErr } = await supabase
      .from("payment_references")
      .select("*")
      .eq("reference", reference)
      .single();

    if (pendingErr) {
      console.error("Webhook: error fetching payment_references", pendingErr);
      return Response.json({ error: "DB lookup failed" }, { status: 500 });
    }

    if (!pending) {
      console.error("Webhook: unknown reference", reference);
      return Response.json({ error: "Unknown reference" }, { status: 400 });
    }

    // verify amount
  const expected = Math.round(pending.amount_zar * 100);
const amountDiff = Math.abs(amount - expected);

if (amountDiff > 2) { // allow 2 cent tolerance
  console.error("Webhook: amount mismatch", { amount, expected, reference });
  return Response.json({ error: "Amount mismatch" }, { status: 400 });
}

    // 🔥 SINGLE SOURCE OF TRUTH UPDATE
    const { error: updateErr } = await supabase
      .from("summaries")
      .update({
        paid: true,
        paid_at: new Date().toISOString(),
      })
      .eq("id", summaryId);

    if (updateErr) {
      console.error("Webhook: failed to update summaries.paid", updateErr, { summaryId });
      return Response.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log("Webhook: marked summary paid", { summaryId, reference });

    // cleanup — non-fatal if this fails, the payment itself already succeeded
  // Replace the delete at the end with an update
const { error: cleanupErr } = await supabase
  .from("payment_references")
  .update({ processed: true, processed_at: new Date().toISOString() })
  .eq("id", pending.id);

    if (cleanupErr) {
      console.error("Webhook: cleanup of payment_references failed (non-fatal)", cleanupErr);
    }
if (pending.processed) {
  console.log("Webhook: already processed, skipping", reference);
  return Response.json({ ok: true }); // return 200 so Paystack stops retrying
}
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Webhook: unexpected error", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}