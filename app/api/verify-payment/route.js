import { createClient } from "@/app/_lib/supabase/server";


export async function POST(req) {
  try {
    const { reference, summaryId } = await req.json();

    if (!reference || !summaryId) {
      return Response.json(
        { success: false, message: "Missing reference or summaryId" },
        { status: 400 }
      );
    }

    // 1️⃣ Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    if (result?.data?.status !== "success") {
      return Response.json(
        { success: false, message: "Payment not successful" },
        { status: 402 }
      );
    }

    // 2️⃣ Update Supabase
    const supabase = createClient();

    const { error } = await supabase
      .from("summaries")
      .update({ is_paid: true })
      .eq("id", summaryId);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { success: false, message: "Database update failed" },
        { status: 500 }
      );
    }

    
   

    return Response.json({ success: true });

  } catch (err) {
    console.error("Verify payment error:", err);

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
