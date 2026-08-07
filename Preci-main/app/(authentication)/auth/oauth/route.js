import { createClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/";
  
    const token = searchParams.get("token");
  const summaryId = searchParams.get("summaryId");


  if (!next.startsWith("/")) {
    next = "/";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  /**
   * Attach guest summary to the newly authenticated user.
   */

  if (summaryId && token) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error: claimError } = await supabase
        .from("summaries")
        .update({
          user_id: user.id,
          summary_token: null,
        })
        .eq("id", summaryId)
        .eq("summary_token", token)
        .is("user_id", null);

      if (claimError) {
        console.error("Failed to claim summary:", claimError);
      }
    }
  }

  /**
   * Redirect
   */

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}