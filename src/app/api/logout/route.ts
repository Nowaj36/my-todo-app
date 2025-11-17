import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set({
    name: "access_token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set({
    name: "refresh_token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
