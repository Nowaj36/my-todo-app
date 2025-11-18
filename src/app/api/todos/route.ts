import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("base url", BASE_URL)
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const form = await req.formData();
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${BASE_URL}/api/todos/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const priority = url.searchParams.get("priority") || "";
    const is_completed = url.searchParams.get("is_completed") || "";
    const todo_date = url.searchParams.get("todo_date") || "";

    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (priority) query.append("priority", priority);
    if (is_completed) query.append("is_completed", is_completed);
    if (todo_date) query.append("todo_date", todo_date);

    const res = await fetch(
      `${BASE_URL}/api/todos/?${query.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}