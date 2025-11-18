import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Get Profile
export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${BASE_URL}/api/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to fetch profile" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}