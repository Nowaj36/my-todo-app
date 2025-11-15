"use client";
import Image from "next/image";
import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
              <span className="text-sm font-medium text-[#0C0C0C]">
                Password
              </span>
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
                <label className="text-sm text-[#374151] ml-2">
                  Remember me
                </label>
              </div>
              <label className="text-sm text-[#5272FF] ml-2 cursor-pointer">
                Forgot your Password?
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#5272FF] text-white text-base py-2 rounded-lg w-full cursor-pointer"
            >
              Log In
            </button>
          </form>

          <p className="text-sm items-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
