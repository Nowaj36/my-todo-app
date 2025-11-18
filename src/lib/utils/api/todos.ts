// Type
export interface Todo {
  title: string;
  description: string;
  priority: "low" | "moderate" | "extreme";
  todo_date: string;
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
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create todo");

  return result;
}

// Get Todos
export const getTodos = async ({ search = "" }) => {
  try {
    const res = await fetch(`/api/todos?search=${search}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      return [];
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};