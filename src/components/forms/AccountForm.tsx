"use client";

import AvatarUpload from "@/components/Dashboard/profile/AvatarUpload";
import { Input } from "@/components/ui/accountInput";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  birthday?: string;
};

const AccountForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white max-w-[947px] rounded-2xl px-8 mt-4 space-y-2 mx-auto pb-6"
    >
      <h2 className="text-2xl text-[#0D224A] font-semibold py-6 inline-block">
        Account Information
        <span className="block border-b-3 border-[#5272FF] w-3/4 mt-1"></span>
      </h2>

      {/* Avatar */}
      <div className="flex justify-start">
        <AvatarUpload />
      </div>
      {/* Form section */}
      <div className="border border-[#D1D5DB] px-8 space-y-4 py-5 rounded-2xl mt-8">
        {/* Row 1: First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <Input {...register("firstName")} label="First Name" />
          <Input {...register("lastName")} label="Last Name" />
        </div>

        {/* Row 2: Email */}
        <div>
          <Input {...register("email")} label="Email" />
        </div>

        {/* Row 3: Phone & Birthday */}
        <div className="grid grid-cols-2 gap-4">
          <Input {...register("address")} label="Address" />
          <Input {...register("phone")} label="Contact Number" />
        </div>

        {/* Row 4: Address - Full width */}
        <div>
          <Input type="date" {...register("birthday")} label="Birthday" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 py-1 justify-center">
          <button
            type="submit"
            className="bg-[#5272FF] text-white w-[200px] py-1.5 rounded-lg cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="border bg-[#8CA3CD] text-white w-[200px] py-1.5 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
