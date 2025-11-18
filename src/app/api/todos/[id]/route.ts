import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const getToken = async () => {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("Unauthorized: No token found");
  return token;
};

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// PATCH (update)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const { id } = params;

    const form = await req.formData();

    const res = await fetch(`https://todo-app.pioneeralpha.com/api/todos/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("PATCH /todos/:id error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
