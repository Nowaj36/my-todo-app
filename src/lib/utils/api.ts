// src/lib/api.ts
export const API_BASE = "https://todo-app.pioneeralpha.com/api/";

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

  const res = await fetch(`${API_BASE}users/signup/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return res.json();
}

// Create Todo

export interface CreateTodoPayload {
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  todo_date: string;
}

export async function createTodo(data: CreateTodoPayload) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("priority", data.priority);
  formData.append("todo_date", data.todo_date);

  const res = await fetch("/api/todos", {
    method: "POST",
    body: formData,
  });

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.error || "Failed to create todo");
  }

  return response;
}