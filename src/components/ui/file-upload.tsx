"use client";

import { Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { imagekit } from "@/lib/imagekit";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value?: string;
  endpoint: "businessLogo" | "reviewImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    try {
      const response = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: endpoint,
      });
      onChange(response.url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  if (value) {
    return (
      <div className="relative h-20 w-20">
        <img src={value} alt="Upload" className="h-full w-full rounded-full object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <Upload className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="dark:bg-zinc-800 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-zinc-200 bg-zinc-100"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Upload className="h-10 w-10 text-zinc-500" />
      )}
    </div>
  );
};
