// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // HttpOnly cookie
  const url = req.nextUrl.clone();

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // If not logged in, redirect to login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in user from accessing login/signup
  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
    if (token) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Only match the protected paths
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"], // static strings only
};
