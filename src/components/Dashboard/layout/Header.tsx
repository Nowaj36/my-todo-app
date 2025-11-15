"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="bg-white w-[1100px] h-22 shadow-sm flex items-center justify-between px-6">
      {/* Left - Logo */}
      <div className="flex items-center ml-12 gap-2">
        <Image src="/dashboard/logo.png" width={35} height={35} alt="Dreamy Software" />
        <p className="font-semibold text-lg text-[#0E2257]">DREAMY SOFTWARE</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative p-2 rounded-lg bg-[#EEF3FF] hover:bg-[#DCE8FF] transition">
          <Bell size={20} className="text-[#0E2257]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Date */}
        <div className="text-sm font-medium text-gray-600">{today}</div>
      </div>
    </header>
  );
};

export default Header;
