import { updateSession } from "./app/_lib/supabase/proxy"



export async function proxy(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/oauth|auth/login|auth/error).*)',
  ],
}

