"use client";

import AvatarUpload from "@/components/Dashboard/profile/AvatarUpload";
import { Input } from "@/components/ui/accountInput";
import { updateProfile } from "@/lib/utils/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  birthday?: string;
};

const AccountForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      birthday: "",
    },
  });

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        const user = await res.json();

        // Populate form with API data
        reset({
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          phone: user.contact_number || "",
          address: user.address || "",
          birthday: user.birthday || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, [reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName || "");
      formData.append("address", data.address || "");
      formData.append("contact_number", data.phone || "");
      formData.append("birthday", data.birthday || "");

      if (selectedImageFile) {
        formData.append("profile_image", selectedImageFile);
      }

      await updateProfile(formData);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message);
    }
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

      <div className="flex justify-start">
        <AvatarUpload onImageSelect={setSelectedImageFile} />
      </div>

      <div className="border border-[#D1D5DB] px-8 space-y-4 py-5 rounded-2xl mt-8">
        <div className="grid grid-cols-2 gap-4">
          <Input {...register("firstName")} label="First Name" />
          <Input {...register("lastName")} label="Last Name" />
        </div>

        <Input {...register("email")} label="Email" />

        <div className="grid grid-cols-2 gap-4">
          <Input {...register("address")} label="Address" />
          <Input {...register("phone")} label="Contact Number" />
        </div>

        <Input type="date" {...register("birthday")} label="Birthday" />

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
