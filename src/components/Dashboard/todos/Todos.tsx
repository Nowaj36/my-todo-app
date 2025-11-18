"use client";

import { getTodos } from "@/lib/utils/api/todos";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilterByDropdown from "./filter/FilterByDropdown";
import AddTaskModal from "./task/AddTaskModel";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "moderate" | "extreme";
  todo_date: string;
  is_completed?: boolean;
}

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTodos({ search });
      console.log(data, "fetched todos");
      setTasks(data);
    } catch (err: any) {
      console.error("Error fetching todos:", err);
      setError(err.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="">
      {/* Page Title + New Task Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl text-[#0D224A] font-bold py-6 inline-block">
          Todos
          <span className="block border-b-3 border-[#5272FF] w-2/4 mt-1"></span>
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#5272FF] text-white text-base px-4 py-2 rounded-lg cursor-pointer"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal open={open} onClose={() => setOpen(false)} />

      {/* Search + Filter */}
      <div className="flex mb-5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search your task here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-sm outline-none caret-black text-black"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#5272FF] text-white p-2 rounded-lg cursor-pointer">
            <Search size={24} />
          </button>
        </div>

        <div className="ml-2">
          <FilterByDropdown />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="w-full h-[300px] flex justify-center items-center">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}

      {/* No Todos */}
      {!loading && !error && tasks.length === 0 && (
        <div className="w-full h-[470px] bg-white border border-[#D1D5DB] rounded-2xl flex justify-center items-center">
          <div
            onClick={() => setOpen(true)}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <Image
              src="/dashboard/noTodos.png"
              alt="No todos"
              width={240}
              height={216}
              className="opacity-100 mb-4"
            />
            <p className="text-gray-600 text-lg">No todos yet</p>
          </div>
        </div>
      )}

      {/* Task Grid */}
      {!loading && !error && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdated={loadTodos}
              onTaskDeleted={loadTodos}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
