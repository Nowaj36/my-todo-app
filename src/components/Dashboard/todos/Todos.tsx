"use client";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FilterByDropdown from "./filter/FilterByDropdown";
import AddTaskModal from "./task/AddTaskModel";

const TodosPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      {/* Page Title + New Task Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl text-[#0D224A] font-bold py-6 inline-block">
          Todos
          <span className="block border-b-3 border-[#5272FF] w-2/4 mt-1"></span>
        </h2>

        {/* New Task Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#5272FF] text-white text-base px-4 py-2 rounded-lg cursor-pointer"
        >
          <Plus size={18} />
          New Task
        </button>
        {open && <AddTaskModal onClose={() => setOpen(false)} />}
      </div>

      <div className="flex mb-5">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search your task here..."
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-sm outline-none caret-black text-black"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#5272FF] text-white p-2 rounded-lg cursor-pointer">
            <Search size={24} />
          </button>
        </div>

        {/* Sort by */}
        <div className="ml-2">
          <FilterByDropdown />
        </div>
      </div>

      {/* No Todos Box */}
      <div className="w-full h-[470px] bg-white border border-[#D1D5DB] rounded-2xl flex justify-center items-center">
        <div
          onClick={() => setOpen(true)}
          className="flex flex-col items-center text-center cursor-pointer"
        >
          {/* Illustration */}
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
    </div>
  );
};

export default TodosPage;
