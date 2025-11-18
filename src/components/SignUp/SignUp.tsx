"use client";
import FormInput from "@/components/SignUp/FormInput";
import { signUp } from "@/lib/utils/api";
import { SignupFormData, signupSchema } from "@/lib/validators/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (err: any) {
      console.error("Signup error:", err.message);

      toast.error(
        err?.message
          ? `Signup failed: ${err.message}`
          : "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <div className="flex bg-white max-w-[1440px]  mx-auto">
      {/* Left Section */}
      <div className="hidden md:flex items-center justify-center bg-[#E2ECF8] max-w-[606px] min-h-screen">
        <Image
          src="/auth/signup-illustration.png"
          alt="Signup Illustration"
          width={613}
          height={344}
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center flex-1 px-6 sm:px-16">
        <h1 className="text-3xl font-bold text-[#0D224A] mb-1">
          Create your account
        </h1>
        <p className="text-[#4B5563] text-base text-center mb-8">
          Start managing your tasks efficiently
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="bg-[#5272FF] text-white text-base py-2 rounded-lg w-full cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-base items-center text-[#4B5563] mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
