import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    // --------------------------------------------------
    // 1. Read raw body
    // --------------------------------------------------

    const rawBody = await req.text();

    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      console.error("Webhook: missing x-paystack-signature header");

      return Response.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 2. Verify Paystack signature
    // --------------------------------------------------

    const expectedSig = createHmac(
      "sha512",
      process.env.PAYSTACK_SECRET_KEY
    )
      .update(rawBody)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");

    const validSig =
      sigBuf.length === expectedBuf.length &&
      timingSafeEqual(sigBuf, expectedBuf);

    if (!validSig) {
      console.error("Webhook: signature mismatch");

      return Response.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 3. Parse webhook
    // --------------------------------------------------

    let event;

    try {
      event = JSON.parse(rawBody);
    } catch (err) {
      console.error("Webhook: invalid JSON", err);

      return Response.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    console.log("Paystack webhook received:", {
      event: event.event,
      reference: event.data?.reference,
      amount: event.data?.amount,
    });

    // --------------------------------------------------
    // 4. Ignore events we don't care about
    // --------------------------------------------------

    if (event.event !== "charge.success") {
      return Response.json({ ok: true });
    }

    // --------------------------------------------------
    // 5. Get payment information
    // --------------------------------------------------

    const {
      reference,
      amount,
    } = event.data ?? {};

    if (!reference) {
      console.error("Webhook: missing reference");

      return Response.json(
        { error: "Missing reference" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 6. Find our payment record
    // --------------------------------------------------

    const { data: pending, error: pendingErr } =
      await supabase
        .from("payment_references")
        .select("*")
        .eq("reference", reference)
        .single();

    if (pendingErr || !pending) {
      console.error(
        "Webhook: payment reference not found",
        {
          reference,
          error: pendingErr,
        }
      );

      return Response.json(
        { error: "Unknown reference" },
        { status: 400 }
      );
    }

    console.log("Webhook: payment reference found", {
      reference,
      summaryId: pending.summary_id,
      amountPaid: amount,
      expectedAmount: Math.round(
        Number(pending.amount_zar) * 100
      ),
      processed: pending.processed,
    });

    // --------------------------------------------------
    // 7. Prevent duplicate processing
    // --------------------------------------------------

    if (pending.processed) {
      console.log(
        "Webhook: payment already processed",
        reference
      );

      return Response.json({ ok: true });
    }

    // --------------------------------------------------
    // 8. Verify amount
    // --------------------------------------------------

    const expectedAmount = Math.round(
      Number(pending.amount_zar) * 100
    );

    const amountDiff = Math.abs(
      Number(amount) - expectedAmount
    );

    if (amountDiff > 2) {
      console.error("Webhook: amount mismatch", {
        reference,
        amount,
        expectedAmount,
      });

      return Response.json(
        { error: "Amount mismatch" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 9. Mark summary as paid
    // --------------------------------------------------

    const { data: updatedSummary, error: updateErr } =
      await supabase
        .from("summaries")
        .update({
          paid: true,
          paid_at: new Date().toISOString(),
        })
        .eq("id", pending.summary_id)
        .select("id, paid, paid_at")
        .single();

    if (updateErr) {
      console.error(
        "Webhook: failed to update summary",
        {
          error: updateErr,
          summaryId: pending.summary_id,
          reference,
        }
      );

      return Response.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    console.log("Webhook: summary successfully marked paid", {
      summaryId: pending.summary_id,
      reference,
      updatedSummary,
    });

    // --------------------------------------------------
    // 10. Mark payment reference as processed
    // --------------------------------------------------

    const { error: processedErr } = await supabase
      .from("payment_references")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("id", pending.id);

    if (processedErr) {
      console.error(
        "Webhook: failed to mark payment processed",
        processedErr
      );

      // Payment itself was successful, so don't make
      // Paystack retry the webhook.
    }

    // --------------------------------------------------
    // 11. Success
    // --------------------------------------------------

    return Response.json({ ok: true });

  } catch (err) {
    console.error(
      "Webhook: unexpected error",
      err
    );

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
