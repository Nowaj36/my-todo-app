import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginPage from "./(auth)/login/page";

export default async function Page() {
  // Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // If token exists → redirect to dashboard
  if (token) {
    redirect("/dashboard/todos");
  }

  return (
    <div>
      <LoginPage />
    </div>
  );
}
