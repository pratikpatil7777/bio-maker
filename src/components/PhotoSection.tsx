'use client';

import React, { useRef } from 'react';
import { useAlert } from './AlertDialog';

interface PhotoSectionProps {
  mainPhoto: string;
  isEditMode: boolean;
  onPhotoChange: (photo: string) => void;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export default function PhotoSection({
  mainPhoto,
  isEditMode,
  onPhotoChange,
  primaryColor = '#D4AF37',
  secondaryColor = '#800020',
  backgroundColor = '#FFFEF0',
}: PhotoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showWarning } = useAlert();

  const handlePhotoClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        await showWarning('Photo size should be less than 5MB', 'File Too Large');
        return;
      }

      // Resize and compress image for optimal PDF export
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.onload = () => {
          // Max dimensions for 4:5 aspect ratio
          const maxWidth = 600;
          const maxHeight = 750;

          let { width, height } = img;

          // Calculate new dimensions maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Enable high-quality image rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to JPEG with 0.9 quality
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.9);
            onPhotoChange(compressedBase64);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // 4:5 aspect ratio dimensions (increased size)
  const frameWidth = 140; // px
  const frameHeight = 175; // px (4:5 ratio)

  return (
    <div className="flex flex-col items-center">
      {/* Photo Frame Container */}
      <div
        className="relative"
        style={{ width: frameWidth + 16, height: frameHeight + 16 }}
      >
        {/* Decorative Outer Border */}
        <svg
          className="absolute inset-0"
          width={frameWidth + 16}
          height={frameHeight + 16}
          viewBox={`0 0 ${frameWidth + 16} ${frameHeight + 16}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer decorative border */}
          <rect
            x="0"
            y="0"
            width={frameWidth + 16}
            height={frameHeight + 16}
            fill="none"
            stroke={primaryColor}
            strokeWidth="3"
          />

          {/* Inner border */}
          <rect
            x="4"
            y="4"
            width={frameWidth + 8}
            height={frameHeight + 8}
            fill="none"
            stroke={primaryColor}
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Corner ornaments - Top Left */}
          <path
            d={`M 0 20 L 0 0 L 20 0`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
          />
          <circle cx="4" cy="4" r="3" fill={secondaryColor} />

          {/* Corner ornaments - Top Right */}
          <path
            d={`M ${frameWidth + 16 - 20} 0 L ${frameWidth + 16} 0 L ${frameWidth + 16} 20`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
          />
          <circle cx={frameWidth + 12} cy="4" r="3" fill={secondaryColor} />

          {/* Corner ornaments - Bottom Left */}
          <path
            d={`M 0 ${frameHeight + 16 - 20} L 0 ${frameHeight + 16} L 20 ${frameHeight + 16}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
          />
          <circle cx="4" cy={frameHeight + 12} r="3" fill={secondaryColor} />

          {/* Corner ornaments - Bottom Right */}
          <path
            d={`M ${frameWidth + 16} ${frameHeight + 16 - 20} L ${frameWidth + 16} ${frameHeight + 16} L ${frameWidth + 16 - 20} ${frameHeight + 16}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
          />
          <circle cx={frameWidth + 12} cy={frameHeight + 12} r="3" fill={secondaryColor} />

          {/* Small decorative elements on edges */}
          {/* Top center */}
          <circle cx={(frameWidth + 16) / 2} cy="1.5" r="2" fill={primaryColor} />
          {/* Bottom center */}
          <circle cx={(frameWidth + 16) / 2} cy={frameHeight + 14.5} r="2" fill={primaryColor} />
          {/* Left center */}
          <circle cx="1.5" cy={(frameHeight + 16) / 2} r="2" fill={primaryColor} />
          {/* Right center */}
          <circle cx={frameWidth + 14.5} cy={(frameHeight + 16) / 2} r="2" fill={primaryColor} />
        </svg>

        {/* Photo Container */}
        <div
          className={`absolute overflow-hidden biodata-photo ${
            isEditMode ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
          }`}
          style={{
            top: 8,
            left: 8,
            width: frameWidth,
            height: frameHeight,
            backgroundColor: backgroundColor,
          }}
          onClick={handlePhotoClick}
          title={isEditMode ? 'Click to upload photo' : ''}
        >
          {mainPhoto ? (
            <img
              src={mainPhoto}
              alt="Profile"
              style={{
                width: frameWidth,
                height: frameHeight,
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center p-2 w-full h-full"
              style={{ color: primaryColor }}
            >
              <svg
                className="w-10 h-10 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              {isEditMode && (
                <span className="text-[10px] text-center opacity-70">
                  Click to add
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      {isEditMode && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {/* Remove photo button */}
      {isEditMode && mainPhoto && (
        <button
          onClick={() => onPhotoChange('')}
          className="mt-2 text-[10px] hover:underline cursor-pointer transition-colors"
          style={{ color: secondaryColor }}
        >
          Remove Photo
        </button>
      )}
    </div>
  );
}
