import { NextResponse } from "next/server";
import { updateSession } from "./app/_lib/supabase/proxy";

export async function proxy(request) {
  // Skip country check in development
  if (process.env.NODE_ENV !== "development") {
    const country = request.headers.get("x-vercel-ip-country");

    if (country !== "ZA") {
      return NextResponse.redirect(new URL("/not-available", request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|not-available|auth/oauth|auth/login|auth/error).*)",
  ],
};

// import { updateSession } from "./app/_lib/supabase/proxy"



// export async function proxy(request) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|auth/oauth|auth/login|auth/error).*)',
//   ],
// }

