'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  variant?: 'compact' | 'full';
}

const languages: { code: Language; label: string; labelFull: string }[] = [
  { code: 'en', label: 'EN', labelFull: 'English' },
  { code: 'hi', label: 'हिं', labelFull: 'हिंदी' },
  { code: 'mr', label: 'मरा', labelFull: 'मराठी' },
];

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleSelect = (code: Language) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button - Globe icon with current language */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-2.5 flex items-center gap-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:border-[#D4AF37]/50 hover:shadow-md group"
        title="Change Language"
      >
        {/* Globe Icon */}
        <svg
          className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>

        {/* Current Language Label */}
        <span
          className="min-w-[24px] text-center"
          style={{ fontFamily: currentLang.code !== 'en' ? "'Noto Sans Devanagari', sans-serif" : undefined }}
        >
          {currentLang.label}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for clicking outside */}
          <div className="fixed inset-0 z-[1000]" onClick={() => setIsOpen(false)} />

          <div className="absolute top-full right-0 mt-1 min-w-[140px] bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-600 shadow-xl overflow-hidden z-[1001] animate-fadeIn">
          {/* Header */}
          <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-700 border-b border-amber-100 dark:border-slate-600">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Language / भाषा
            </span>
          </div>

          {/* Language Options */}
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full px-3 py-2.5 flex items-center gap-3 transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-amber-50 dark:bg-slate-700 text-amber-900 dark:text-amber-300'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                {/* Language Code Badge */}
                <span
                  className={`w-8 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white'
                      : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-slate-300'
                  }`}
                  style={{ fontFamily: lang.code !== 'en' ? "'Noto Sans Devanagari', sans-serif" : undefined }}
                >
                  {lang.label}
                </span>

                {/* Full Name */}
                <span
                  className="flex-1 text-sm font-medium text-left"
                  style={{ fontFamily: lang.code !== 'en' ? "'Noto Sans Devanagari', sans-serif" : undefined }}
                >
                  {lang.labelFull}
                </span>

                {/* Checkmark for selected */}
                {language === lang.code && (
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        </>
      )}

      {/* Styles for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}
