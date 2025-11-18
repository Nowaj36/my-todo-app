"use client";

import { deleteTodo, updateTodo } from "@/lib/utils/api/todos";
import { Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const priorityBorderColors: Record<string, string> = {
  low: "border-[#FEF9C3]",
  moderate: "border-[#DCFCE7]",
  extreme: "border-[#FEE2E2]",
};

const priorityBadgeColors: Record<string, string> = {
  low: "bg-[#FEF9C3] text-[#CA8A04] ",
  moderate: "bg-[#DCFCE7] text-[#16A34A]",
  extreme: "bg-[#FEE2E2] text-[#DC2626]",
};

export type Task = {
  id?: string;
  title: string;
  description?: string;
  todo_date?: string;
  priority: string;
  is_completed?: boolean;
};

type TaskCardProps = {
  task: Task;
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
};

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }: TaskCardProps) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggleComplete = async () => {
    if (!task.id) return;
    try {
      setUpdating(true);
      await updateTodo(task.id, { is_completed: !task.is_completed });
      toast.success("Task updated!");
      onTaskUpdated?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to update task");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!task.id) return;
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      setDeleting(true);
      await deleteTodo(task.id);
      toast.success("Task deleted!");
      onTaskDeleted?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  // Full border color based on priority
  const cardBorderColor =
    priorityBorderColors[task.priority] || "border-gray-200";

  return (
    <div
      className={`bg-white rounded-xl p-5 shadow-sm border ${cardBorderColor} w-full max-w-sm`}
    >
      {/* Row: Title + Badge + Grid Icon */}
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-[#0D224A]">{task.title}</h3>

        <div className="flex items-center gap-2">
          {/* Priority Badge */}
          <span
            className={`px-2.5 py-2 rounded-sm text-sm font-medium capitalize ${
              priorityBadgeColors[task.priority] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.priority}
          </span>

          {/* Grid Icon (visual only) */}
          <div className="grid grid-cols-2 gap-0.5">
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
            <span className="w-1 h-1 bg-[#8CA3CD] rounded"></span>
          </div>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-[#4B5563] text-sm mt-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Due Date + Icons (flex between) */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Due {task.todo_date || "N/A"}</p>

        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            onClick={handleToggleComplete}
            disabled={updating}
          >
            <Edit3 size={18} className="text-blue-600" />
          </button>

          <button
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
