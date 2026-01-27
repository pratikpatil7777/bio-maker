'use client';

import React, { useState } from 'react';
import { borderDesigns, BorderDesign } from '@/lib/borders';
import { Language } from '@/lib/translations';

interface BorderSelectorProps {
  language: Language;
  currentBorder: BorderDesign;
  primaryColor: string;
  onBorderChange: (border: BorderDesign) => void;
}

// Mini preview SVGs for each border style
const BorderPreview = ({ borderId, color }: { borderId: string; color: string }) => {
  switch (borderId) {
    case 'paisley':
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M8 8 C12 8 14 12 12 16 C10 20 6 18 6 14 C6 10 8 8 8 8" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <path d="M32 32 C28 32 26 28 28 24 C30 20 34 22 34 26 C34 30 32 32 32 32" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
        </svg>
      );
    case 'mandala':
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="8" cy="8" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx="32" cy="8" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx="8" cy="32" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx="32" cy="32" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          {[0, 45, 90, 135].map((angle) => (
            <line key={angle} x1="8" y1="4" x2="8" y2="0" stroke={color} strokeWidth="0.5" opacity="0.5" transform={`rotate(${angle} 8 8)`} />
          ))}
        </svg>
      );
    case 'peacock':
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" />
          <ellipse cx="8" cy="10" rx="4" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="32" cy="10" rx="4" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="8" cy="30" rx="4" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="32" cy="30" rx="4" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx="8" cy="8" r="1.5" fill={color} opacity="0.6" />
          <circle cx="32" cy="8" r="1.5" fill={color} opacity="0.6" />
        </svg>
      );
    case 'artdeco':
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" />
          <rect x="5" y="5" width="30" height="30" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <path d="M2 10 L10 2" stroke={color} strokeWidth="1" opacity="0.7" />
          <path d="M2 6 L6 2" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <path d="M38 10 L30 2" stroke={color} strokeWidth="1" opacity="0.7" />
          <path d="M38 6 L34 2" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <path d="M2 30 L10 38" stroke={color} strokeWidth="1" opacity="0.7" />
          <path d="M38 30 L30 38" stroke={color} strokeWidth="1" opacity="0.7" />
        </svg>
      );
    case 'classic':
    default:
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" />
          <rect x="5" y="5" width="30" height="30" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <text x="6" y="12" fontSize="8" fill={color} opacity="0.7">❧</text>
          <text x="28" y="36" fontSize="8" fill={color} opacity="0.7" transform="rotate(180 32 32)">❧</text>
        </svg>
      );
  }
};

export default function BorderSelector({
  language,
  currentBorder,
  primaryColor,
  onBorderChange,
}: BorderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMarathi = language === 'mr';

  return (
    <div className="relative">
      {/* Border Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 shadow-sm cursor-pointer"
      >
        {/* Current border preview */}
        <div className="w-5 h-5 rounded border border-gray-200 dark:border-slate-500 overflow-hidden">
          <BorderPreview borderId={currentBorder.id} color={primaryColor} />
        </div>
        <span className="text-[#555] dark:text-slate-200">{isMarathi ? 'बॉर्डर' : 'Border'}</span>
        <svg
          className={`w-3 h-3 text-[#777] dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute left-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 min-w-[220px]">
            <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-700">
              <p className="text-[10px] uppercase tracking-wider text-[#999] dark:text-slate-400 font-semibold">
                {isMarathi ? 'बॉर्डर डिझाइन निवडा' : 'Select Border Design'}
              </p>
            </div>

            <div className="p-2">
              {borderDesigns.map((border) => (
                <button
                  key={border.id}
                  onClick={() => {
                    onBorderChange(border);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                    currentBorder.id === border.id
                      ? 'bg-gray-100 dark:bg-slate-700'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {/* Border preview */}
                  <div
                    className="w-10 h-10 rounded-lg border-2 overflow-hidden flex-shrink-0 bg-[#FFFEF8]"
                    style={{
                      borderColor: currentBorder.id === border.id ? primaryColor : '#e5e7eb',
                    }}
                  >
                    <BorderPreview borderId={border.id} color={primaryColor} />
                  </div>

                  {/* Border name and description */}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-[#333] dark:text-slate-200">
                      {isMarathi ? border.nameMarathi : border.name}
                    </p>
                    <p className="text-[10px] text-[#777] dark:text-slate-400">{border.description}</p>
                  </div>

                  {/* Checkmark */}
                  {currentBorder.id === border.id && (
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: primaryColor }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
