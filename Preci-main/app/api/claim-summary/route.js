import { createClient } from "@/app/_lib/supabase/server";

export async function POST(req) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { summaryId, token } = await req.json();

  if (!summaryId || !token) {
    return Response.json(
      { error: "Missing summaryId or token" },
      { status: 400 }
    );
  }

  // Verify that the guest summary exists
  const { data: summary, error: summaryError } = await supabase
    .from("summaries")
    .select("id, user_id, summary_token")
    .eq("id", summaryId)
    .eq("summary_token", token)
    .is("user_id", null)
    .maybeSingle();

  if (summaryError) {
    console.error(summaryError);

    return Response.json(
      { error: "Unable to verify summary." },
      { status: 500 }
    );
  }

  if (!summary) {
    return Response.json(
      { error: "Summary not found or already claimed." },
      { status: 404 }
    );
  }

  const { error: updateError } = await supabase
    .from("summaries")
    .update({
      user_id: user.id,
      summary_token: null,
    })
    .eq("id", summaryId)
    .eq("summary_token", token)
    .is("user_id", null);

  if (updateError) {
    console.error(updateError);

    return Response.json(
      { error: "Failed to claim summary." },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
  });
}