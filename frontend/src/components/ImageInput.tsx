"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function ImageInput({
  setImage,
  label,
  savedPreview = "",
}: {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  label: string;
  savedPreview?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  console.log(savedPreview);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clear the states and file input on component mount
  useEffect(() => {
    setImage(null); // Clear the parent state
    setPreview(null); // Clear the local preview state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value
    }
  }, [setImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">{label}</h2>

      {/* Image Preview */}
      {preview || savedPreview ? (
        <div className="relative w-40 h-40">
          <Image
            width={500}
            height={500}
            src={preview ? preview : savedPreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <button
            onClick={handleClear}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          No image selected
        </div>
      )}

      {/* File Input */}
      <label
        htmlFor="fileInput"
        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
      >
        Select Image
      </label>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
