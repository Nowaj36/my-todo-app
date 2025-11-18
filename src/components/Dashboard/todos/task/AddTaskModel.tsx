"use client";

import { createTodo } from "@/lib/utils/api/todos";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AddTaskModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  const [task, setTask] = useState({
    title: "",
    date: "",
    description: "",
    priority: "moderate" as "extreme" | "moderate" | "low",
  });

  const [loading, setLoading] = useState(false);

  const handleCreateTodo = async () => {
    if (!task.title || !task.date || !task.priority) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await createTodo({
        title: task.title,
        description: task.description,
        priority: task.priority,
        todo_date: task.date,
      });

      toast.success("Task created successfully!");
      onClose();
    } catch (e: any) {
      toast.error(e.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/70 z-50">
      <div className="max-w-[591px] bg-white rounded-2xl border border-gray-300 p-8 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base font-semibold text-black relative pb-1">
            Add New Task
            <span className="absolute left-0 bottom-0 w-[110px] h-0.5 bg-[#4F7BFF]" />
          </h2>

          <button
            onClick={onClose}
            className="text-[15px] text-black underline cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Title */}
        <label className="text-sm font-semibold text-[#0C0C0C]">Title</label>
        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="
            w-full mt-1 mb-6 px-3 py-2
            border border-[#A1A3AB] rounded-md
            text-sm outline-none text-black caret-black
          "
        />

        {/* Date */}
        <label className="text-sm font-semibold text-[#0C0C0C]">Date</label>
        <div className="relative mt-1 mb-6">
          <input
            type="date"
            value={task.date}
            onChange={(e) => setTask({ ...task, date: e.target.value })}
            className="
             w-full mt-1 mb-6 px-3 py-2
            border border-[#A1A3AB] rounded-md
            text-sm outline-none text-black caret-black
            "
          />
        </div>

        {/* Priority */}
        <label className="text-sm font-semibold text-[#0C0C0C]">Priority</label>
        <div className="flex items-center gap-10 mt-2 mb-6 text-sm">
          {["extreme", "moderate", "low"].map((level) => (
            <label
              key={level}
              className="flex text-[#4B5563] items-center gap-2 cursor-pointer capitalize"
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  level === "extreme"
                    ? "bg-red-500"
                    : level === "moderate"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              ></span>
              {level}
              <input
                type="checkbox"
                checked={task.priority === level}
                onChange={() =>
                  setTask({
                    ...task,
                    priority: level as "extreme" | "moderate" | "low",
                  })
                }
                className="ml-1 w-4 h-4 accent-[#5272FF]"
              />
            </label>
          ))}
        </div>

        {/* Description */}
        <label className="text-sm font-semibold text-[#0C0C0C]">
          Task Description
        </label>

        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Start writing here....."
          className="
            w-full mt-2 px-3 py-2.5
            border border-[#A1A3AB] rounded-md
            h-40 text-sm outline-none text-black caret-black
            resize-none
          "
        />

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          {/* Done */}
          <button
            onClick={handleCreateTodo}
            disabled={loading}
            className="
            bg-[#5272FF] text-white px-8 py-2 rounded-lg font-medium shadow-sm hover:bg-[#3a5cee] transition disabled:opacity-50
          "
          >
            Done
          </button>

          {/* Delete */}
          <button
            className="
            bg-red-500 text-white 
            p-3 rounded-lg 
            shadow-sm hover:bg-red-600 transition
          "
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
