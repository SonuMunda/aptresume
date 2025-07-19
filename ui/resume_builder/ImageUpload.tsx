'use client';

import { PhotoOutlined } from "@mui/icons-material";
import { Box, Input } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (imageDataUrl: string) => void;
  imagePreview?: string; 
}

const ImageUpload = ({ onChange, imagePreview }: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onChange(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="div" className="form-group mx-auto">
      <Box
        component="label"
        htmlFor="image"
        className="text-sm p-2 bg-gray-200 h-16 w-16 flex items-center justify-center rounded-full block cursor-pointer hover:bg-gray-300 text-gray-400 hover:text-gray-500 overflow-hidden"
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Profile"
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <PhotoOutlined fontSize="large" />
        )}
      </Box>
      <Input
        type="file"
        sx={{ display: "none" }}
        id="image"
        onChange={handleImageChange}
        accept="image/*"
      />
    </Box>
  );
};

export default ImageUpload;
