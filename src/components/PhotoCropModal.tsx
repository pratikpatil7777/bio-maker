'use client';

import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Language } from '@/lib/types';

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImage: string) => void;
  language: Language;
}

// Helper to create cropped image
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('No 2d context');

  // Set canvas size to desired output (4:5 aspect ratio, max 600x750)
  const maxWidth = 600;
  const maxHeight = 750;

  // Calculate output dimensions maintaining aspect ratio
  const aspectRatio = pixelCrop.width / pixelCrop.height;
  let outputWidth = maxWidth;
  let outputHeight = maxWidth / aspectRatio;

  if (outputHeight > maxHeight) {
    outputHeight = maxHeight;
    outputWidth = maxHeight * aspectRatio;
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return canvas.toDataURL('image/jpeg', 0.9);
}

export default function PhotoCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  language,
}: PhotoCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const onCropAreaChange = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-[90vw] max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getText('Adjust Photo', 'फोटो एडजस्ट करें', 'फोटो समायोजित करा')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {getText('Drag to reposition, scroll to zoom', 'खींचकर स्थिति बदलें, ज़ूम के लिए स्क्रॉल करें', 'स्थान बदलण्यासाठी ड्रॅग करा, झूम करण्यासाठी स्क्रोल करा')}
          </p>
        </div>

        {/* Cropper Area */}
        <div className="relative h-[350px] bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 5}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropAreaChange}
            cropShape="rect"
            showGrid={true}
          />
        </div>

        {/* Zoom Slider */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            {getText('Cancel', 'रद्द करें', 'रद्द करा')}
          </button>
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {getText('Saving...', 'सेव हो रहा है...', 'सेव्ह करत आहे...')}
              </>
            ) : (
              getText('Save', 'सेव करें', 'सेव्ह करा')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
