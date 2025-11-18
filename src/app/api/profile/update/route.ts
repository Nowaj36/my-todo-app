import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Update Profile
export async function PATCH(req: Request) {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const backendRes = await fetch(
      `${BASE_URL}/api/users/me/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!backendRes.ok) {
      const err = await backendRes.json();
      return NextResponse.json(err, { status: backendRes.status });
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
