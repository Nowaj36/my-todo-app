"use client";

import { useProfile } from "@/lib/utils/hooks/userProfile"; // path to your hook
import { CheckSquare, Home, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { label: "Dashboard", href: "#", icon: <Home size={18} /> },
  { label: "Todos", href: "/dashboard/todos", icon: <CheckSquare size={18} /> },
  {
    label: "Account Information",
    href: "/dashboard/account",
    icon: <User size={18} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, loading } = useProfile();

  const handleLogout = async () => {
    // call logout API
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="min-w-[340px] min-h-screen bg-[#0D224A] text-white flex flex-col justify-between">
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center py-8 gap-2 ">
          <Image
            src={
              loading
                ? "/loading-avatar.gif"
                : profile?.profile_image
                ? profile.profile_image
                : "/default-avatar.png"
            }
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
            alt="profile"
          />

          <h4 className="font-semibold text-sm">
            {loading
              ? "Loading..."
              : `${profile?.first_name} ${profile?.last_name}`}
          </h4>
          <p className="text-xs opacity-80">{loading ? "" : profile?.email}</p>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-base transition-all 
                  ${
                    isActive
                      ? "bg-linear-50 from-[#5272FF]/30 to-[#0D224A] text-white"
                      : "text-[#8CA3CD]"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 ml-6 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-base text-[#8CA3CD] cursor-pointer"
        >
          <LogOut size={24} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
