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
      <div className="relative h-9 inline-flex items-center bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm">
        {/* Sliding Background Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-md transition-all duration-300 ease-out ${
            language === 'mr' ? 'left-[calc(50%+2px)]' : 'left-1'
          }`}
          style={{
            boxShadow: '0 2px 6px rgba(212, 175, 55, 0.35)',
          }}
        />

        {/* English Button */}
        <button
          onClick={() => onLanguageChange('en')}
          className={`relative z-10 h-7 px-3 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md min-w-[40px] ${
            language === 'en'
              ? 'text-white'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
          }`}
        >
          EN
        </button>

        {/* Marathi Button */}
        <button
          onClick={() => onLanguageChange('mr')}
          className={`relative z-10 h-7 px-3 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md min-w-[40px] ${
            language === 'mr'
              ? 'text-white'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
          }`}
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          मरा
        </button>
      </div>
    </div>
  );
}
