"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      toast.success("Login Successful!");
      router.push("/dashboard/todos");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-white max-w-[1440px] h-[840px] mx-auto">
      {/* Left Section */}
      <div className="hidden md:flex items-center justify-center bg-[#E2ECF8] h-full w-[606px] shrink-0">
        <Image
          src="/auth/login-illustration.png"
          alt="Login Illustration"
          width={613}
          height={344}
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center flex-1 px-6 sm:px-16">
        <h1 className="text-3xl font-bold text-[#0D224A] mb-2">
          Log in to your account
        </h1>
        <p className="text-[#4B5563] text-base text-center mb-6">
          Start managing your tasks efficiently
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 w-md">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-[#0C0C0C]">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-[#D1D5DB] rounded-lg px-4 py-2 w-full outline-none text-[#0C0C0C] text-sm caret-[#0C0C0C]"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-[#0C0C0C]">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-[#D1D5DB] rounded-lg px-4 py-2 w-full outline-none text-[#0C0C0C] text-sm caret-[#0C0C0C]"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between">
            <div>
              <input
                type="checkbox"
                className="form-check-input accent-[#5272FF]"
              />
              <label className="text-sm text-[#374151] ml-2">Remember me</label>
            </div>
            <label className="text-sm text-[#5272FF] ml-2 cursor-pointer">
              Forgot your Password?
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#5272FF] text-white text-base py-2 rounded-lg w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="text-sm items-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
