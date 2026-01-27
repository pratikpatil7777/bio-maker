'use client';

import React from 'react';
import { Language } from '@/lib/translations';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="h-9 flex items-center">
      {/* Language Toggle - Unified Pill Design */}
      <div className="relative h-9 inline-flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm">
        {/* Sliding Background Indicator - Golden */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md transition-all duration-300 ease-out ${
            language === 'mr' ? 'left-[calc(50%+2px)]' : 'left-1'
          }`}
          style={{
            background: 'linear-gradient(to right, #D4AF37, #B8860B)',
            boxShadow: '0 2px 8px rgba(212, 175, 55, 0.5)',
          }}
        />

        {/* English Button */}
        <button
          onClick={() => onLanguageChange('en')}
          className={`relative z-10 h-7 px-3 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md min-w-[40px] ${
            language === 'en'
              ? 'golden-btn text-white'
              : 'text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white'
          }`}
          style={{ background: 'transparent' }}
        >
          EN
        </button>

        {/* Marathi Button */}
        <button
          onClick={() => onLanguageChange('mr')}
          className={`relative z-10 h-7 px-3 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md min-w-[40px] ${
            language === 'mr'
              ? 'golden-btn text-white'
              : 'text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white'
          }`}
          style={{ background: 'transparent', fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          मरा
        </button>
      </div>
    </div>
  );
}
