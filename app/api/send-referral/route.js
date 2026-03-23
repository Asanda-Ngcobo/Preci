
import { createClient } from "@/app/_lib/supabase/server";
import { cookies } from "next/headers";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const serviceSupabase = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);



// ─── Disposable/temp email domain blocklist ───────────────────────────────────
// Extend this list, or swap in a maintained open-source list:
// https://github.com/disposable-email-domains/disposable-email-domains
const BLOCKED_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.info",
  "tempmail.com", "temp-mail.org", "throwam.com", "sharklasers.com",
  "spam4.me", "trashmail.com", "trashmail.me", "trashmail.at", "trashmail.io",
  "yopmail.com", "yopmail.fr", "maildrop.cc", "mailnull.com",
  "dispostable.com", "fakeinbox.com", "tempr.email", "discard.email",
  "spamgourmet.com", "mailnew.com", "mailscrap.com",
]);

function isDisposableEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? BLOCKED_DOMAINS.has(domain) : true;
}

// ─── In-memory rate limiter (per user, resets on cold start) ─────────────────
// For production replace with Redis/Upstash or a DB counter.
const inviteAttempts = new Map();
const RATE_LIMIT_MAX    = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(userId) {
  const now    = Date.now();
  const record = inviteAttempts.get(userId);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    inviteAttempts.set(userId, { count: 1, windowStart: now });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count++;
  return false;
}

export async function POST(req) {
  // ─── 1. Auth ───────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const supabase  = await createClient(

    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ─── 2. Rate limit ─────────────────────────────────────────────────────────
  if (isRateLimited(user.id)) {
    return Response.json(
      { error: "Too many invite attempts. Try again in an hour." },
      { status: 429 }
    );
  }

  // ─── 3. Parse + validate ───────────────────────────────────────────────────
  const { summaryId, email: rawEmail } = await req.json();
  if (!summaryId || !rawEmail) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const invitedEmail = rawEmail.trim().toLowerCase();
  const callerEmail  = user.email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invitedEmail)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  // ─── 4. Self-invite ────────────────────────────────────────────────────────
  if (invitedEmail === callerEmail) {
    return Response.json({ error: "You can't invite yourself" }, { status: 400 });
  }

  // ─── 5. Disposable email check ─────────────────────────────────────────────
  if (isDisposableEmail(invitedEmail)) {
    return Response.json({ error: "Please use a real email address" }, { status: 400 });
  }

  // ─── 6. One discount per user account (lifetime) ───────────────────────────
  // Primary abuse guard: regardless of how many summaries a user has,
  // they can only ever redeem one referral discount.
  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_discount_used")
    .eq("id", user.id)
    .single();

  if (profile?.referral_discount_used) {
    return Response.json(
      { error: "You've already used your referral discount" },
      { status: 400 }
    );
  }

  // ─── 7. Summary ownership ──────────────────────────────────────────────────
  const { data: summary, error: summaryError } = await supabase
    .from("summaries")
    .select("id, price_zar, referral_used, user_id")
    .eq("id", summaryId)
    .single();

  if (summaryError || !summary) {
    return Response.json({ error: "Summary not found" }, { status: 404 });
  }
  if (summary.user_id !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  if (summary.referral_used) {
    return Response.json({ error: "Discount already applied to this summary" }, { status: 400 });
  }

  // ─── 8. Invited email must not already have an account ─────────────────────
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", invitedEmail)
    .maybeSingle();

  if (existingUser) {
    return Response.json({ error: "That person already has an account" }, { status: 400 });
  }

  // ─── 9. One invite per email address globally ──────────────────────────────
  // Prevents user A and user B both trying to invite the same throwaway address.
  const { data: existingReferral } = await supabase
    .from("referrals")
    .select("id")
    .eq("invited_email", invitedEmail)
    .maybeSingle();

  if (existingReferral) {
    return Response.json(
      { error: "That email has already been invited" },
      { status: 400 }
    );
  }

  // ─── 10. Apply everything atomically ───────────────────────────────────────
  const finalPrice = summary.price_zar * 0.5;
console.log("Calling RPC with:", {
  p_summary_id:       summaryId,
  p_referrer_id:      user.id,
  p_invited_email:    invitedEmail,
  p_discounted_price: finalPrice,
});

const { data: rpcData, error: rpcError } = await serviceSupabase.rpc("apply_referral_discount_immediate", {
  p_summary_id:       summaryId,
  p_referrer_id:      user.id,
  p_invited_email:    invitedEmail,
  p_discounted_price: finalPrice,
});

// console.log("RPC result:", rpcData, rpcError);

  if (rpcError) {
    console.error("apply_referral_discount_immediate failed:", rpcError);
    return Response.json({ error: "Failed to apply discount" }, { status: 500 });
  }

  // ─── 11. Send invite email ─────────────────────────────────────────────────
  // await sendInviteEmail({ to: invitedEmail, referrerEmail: callerEmail });

  return Response.json({ success: true, discountedPrice: finalPrice });
}