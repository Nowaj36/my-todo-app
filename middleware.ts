// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // protected routes (only logged-in users can access)
  const protectedRoutes = ["/dashboard", "/todos"];

  // If user NOT logged in and trying to access protected routes
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user IS logged in and tries to visit Login or Register page -> go to dashboard
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to certain routes (optional but recommended)
export const config = {
  matcher: ["/", "/login", "/dashboard", "/todos/:path*"],
};
