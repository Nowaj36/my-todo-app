"use client";

import { Camera, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface AvatarUploadProps {
  onImageSelect: (file: File) => void;
}

const AvatarUpload = ({ onImageSelect }: AvatarUploadProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);

    // Send file to parent
    onImageSelect(file);
  };

  return (
    <div className="flex items-center gap-4 border border-[#D1D5DB] rounded-3xl p-2 px-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ">
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <div className="w-full h-full bg-[#9F9F9F]" />
          )}
        </div>

        <button
          onClick={() => fileRef.current?.click()}
          className="absolute bottom-0 right-1 bg-[#5272FF] text-white p-2 rounded-full cursor-pointer"
        >
          <Camera size={16} />
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 bg-[#5272FF] text-white px-4 py-1.5 rounded-lg cursor-pointer"
      >
        <Upload size={18} /> Upload New Photo
      </button>
    </div>
  );
};

export default AvatarUpload;
