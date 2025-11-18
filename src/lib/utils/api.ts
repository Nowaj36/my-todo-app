// src/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Signup
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signUp(data: SignUpData) {
  const formData = new FormData();
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append("email", data.email);
  formData.append("password", data.password);

  const res = await fetch(`${API_BASE}/api/users/signup/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return res.json();
}

// Update Profile
export async function updateProfile(formData: FormData) {
  const res = await fetch("/api/profile/update", {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update profile");
  }

  return res.json();
}