import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();

  // Authenticate the user on the api routes
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req: request, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user) {
    return res;
  }

  // If not, redirect to the sign in page
  redirectUrl.pathname = "/";

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: "/api/workspaces",
};
