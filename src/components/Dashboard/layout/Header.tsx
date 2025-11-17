"use client";

import { Bell, CalendarDays } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const today = new Date();

  const weekday = today.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="bg-white w-[1100px] h-22 shadow-sm flex items-center justify-between px-6">
      {/* Left - Logo */}
      <div className="flex items-center ml-12 gap-2 cursor-pointer">
        <Image
          src="/dashboard/logo.png"
          width={35}
          height={35}
          alt="Dreamy Software"
        />
        <p className="font-bold text-base text-[#0E2257] leading-5">
          DREAMY<span className="block font-medium">SOFTWARE</span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 mr-10">
        {/* Notification */}
        <button className="relative p-1.5 rounded-lg bg-[#5272FF] transition">
          <Bell size={20} className="text-white" />
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>
        {/* Calendar icon */}
        <button className="relative p-1.5 rounded-lg bg-[#5272FF] transition">
          <CalendarDays size={20} className="text-white" />
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>
        {/* Date */}
        <div className="text-sm font-medium text-gray-600">
          <div className="font-medium">{weekday}</div>
          <div>{date}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
