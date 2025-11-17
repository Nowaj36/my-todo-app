import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Convert JSON → FormData (required by real API)
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("https://todo-app.pioneeralpha.com/api/auth/login/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 401 });
    }

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: data.user,
    });

    // Store cookies
    response.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
