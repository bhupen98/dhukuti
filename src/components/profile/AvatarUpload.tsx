"use client";
import React, { useState, useRef } from "react";
import Avatar from "boring-avatars";
import { dhukutiToast } from "@/lib/toast";

interface AvatarUploadProps {
  name: string;
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
}

export default function AvatarUpload({ name, currentAvatar, onAvatarChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      dhukutiToast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      dhukutiToast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onAvatarChange(data.data.avatarUrl);
        dhukutiToast.success("Avatar updated successfully");
      } else {
        const error = await response.json();
        dhukutiToast.error(error.error || "Failed to upload avatar");
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      dhukutiToast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Avatar
          name={name}
          size={100}
          variant="beam"
          colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]}
        />
        <button
          onClick={handleClick}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )}
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
} 