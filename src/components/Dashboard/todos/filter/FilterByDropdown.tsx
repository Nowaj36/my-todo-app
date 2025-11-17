"use client";

import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

const FilterByDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between
          w-[120px] 
          px-4 py-2
          border border-gray-300 
          rounded-lg
          bg-white
          text-[15px] 
          font-medium
          text-black
          outline-none
          cursor-pointer
        "
      >
        Filter By
        <ArrowUpDown size={16} className="text-black ml-1" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 
            w-[220px]
            bg-white 
            border border-gray-300 
            rounded-xl 
            shadow-lg 
            py-3
            z-20
          "
        >
          {/* Title */}
          <div className="px-4 pb-1 text-[15px] font-semibold text-gray-700">
            Date
          </div>

          {/* Underline */}
          <div className="w-full border-b border-gray-300 mb-2" />

          {/* Options */}
          <div className="space-y-2 px-4 text-[14px] text-gray-700">
            {[
              "Deadline Today",
              "Expires in 5 days",
              "Expires in 10 days",
              "Expires in 30 days",
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="
                    w-5 h-5 
                    border-gray-400 rounded 
                    accent-[#5272FF]
                  "
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterByDropdown;
