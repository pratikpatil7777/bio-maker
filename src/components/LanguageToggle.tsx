'use client';

import React from 'react';
import { Language } from '@/lib/translations';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Globe Icon */}
      <div className="text-[#D4AF37]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>

      {/* Language Toggle - Pill Style */}
      <div className="relative inline-flex bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
        {/* English Button */}
        <button
          onClick={() => onLanguageChange('en')}
          className={`relative z-10 px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
            language === 'en'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full shadow-md'
              : 'text-[#555] hover:text-[#333] bg-transparent'
          }`}
        >
          EN
        </button>

        {/* Marathi Button */}
        <button
          onClick={() => onLanguageChange('mr')}
          className={`relative z-10 px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
            language === 'mr'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full shadow-md'
              : 'text-[#555] hover:text-[#333] bg-transparent'
          }`}
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          मरा
        </button>
      </div>
    </div>
  );
}
