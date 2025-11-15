"use client";

import { Camera, Upload } from "lucide-react";
import { useRef, useState } from "react";

const AvatarUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="flex items-center gap-4 border border-[#D1D5DB] rounded-3xl p-2 px-6">
      {/* Wrapper (so camera button is not clipped) */}
      <div className="relative">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#9F9F9F]" />
          )}
        </div>

        {/* Camera Button OUTSIDE the clipped area */}
        <button
          onClick={() => fileRef.current?.click()}
          className="absolute bottom-0 right-1  bg-[#5272FF] text-white p-2 rounded-full shadow-md flex items-center justify-center hover:bg-[#3d63d6] transition"
        >
          <Camera size={16} />
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 bg-[#5272FF] text-white px-4 py-2 rounded-lg text-base transition shadow-sm"
      >
        <Upload size={18} />
        Upload New Photo
      </button>
    </div>
  );
};

export default AvatarUpload;
