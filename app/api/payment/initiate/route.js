import { createClient } from "@/app/_lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();

  const supabase = await createClient({
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { summaryId, token, email } = await req.json();

  if (!summaryId) {
    return Response.json(
      { error: "Missing summaryId" },
      { status: 400 }
    );
  }

  let query = supabase
    .from("summaries")
    .select(`
      id,
      paid,
      user_id,
      summary_token,
      price_zar,
      discounted_price_zar,
      referral_used
    `)
    .eq("id", summaryId);

  if (user) {
    query = query.eq("user_id", user.id);
  } else {
    if (!token) {
      return Response.json(
        { error: "Missing guest token" },
        { status: 401 }
      );
    }

    query = query
      .is("user_id", null)
      .eq("summary_token", token);
  }

  const { data: summary, error } = await query.single();

  if (error || !summary) {
    return Response.json(
      { error: "Summary not found" },
      { status: 404 }
    );
  }

  if (summary.paid) {
    return Response.json(
      { error: "Summary already unlocked" },
      { status: 400 }
    );
  }

  const amountZar =
    summary.referral_used &&
    summary.discounted_price_zar != null
      ? summary.discounted_price_zar
      : summary.price_zar;

  const amountKobo = Math.round(amountZar * 100);

  const reference = `${summaryId}-${Date.now()}`;


  const customerEmail = user?.email ?? email;

  if (!customerEmail) {
    return Response.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  const paystackRes = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        amount: amountKobo,
        currency: "ZAR",
        reference,
        metadata: {
          summaryId,
          userId: user?.id ?? null,
          guest: !user,
        },
       callback_url: user
  ? `/users/${summaryId}`
  : `/${summaryId}?token=${token}`,
      }),
    }
  );

  const paystackData = await paystackRes.json();

  if (!paystackData.status) {
    console.error(paystackData);

    return Response.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }

  const { error: Paymenterror } = await supabase
    .from("payment_references")
    .insert({
      reference,
      summary_id: summaryId,
      user_id: user?.id ?? null,
      amount_zar: amountZar,
    });
  if (Paymenterror) {
    console.error("Failed to insert the new payment_references row:", error);
    return Response.json({ error: "DB insert failed" }, { status: 500 });
  }
  return Response.json({
    authorization_url:
      paystackData.data.authorization_url,
    reference,
  });
}