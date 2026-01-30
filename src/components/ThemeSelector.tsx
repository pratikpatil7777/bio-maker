'use client';

import React, { useState } from 'react';
import { themes, Theme } from '@/lib/themes';
import { Language } from '@/lib/translations';

interface ThemeSelectorProps {
  language: Language;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({
  language,
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const getThemeName = (theme: Theme) => {
    if (isHindi) return theme.nameHindi || theme.name;
    if (isMarathi) return theme.nameMarathi;
    return theme.name;
  };

  return (
    <div className="relative group/theme">
      {/* Theme Button - Unified styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 flex items-center gap-2 px-3 rounded-lg font-medium text-xs transition-all duration-300 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/60 hover:shadow-md shadow-sm cursor-pointer"
      >
        {/* Theme swatch with decorative ring */}
        <div className="relative">
          <div
            className="w-5 h-5 rounded-full shadow-inner"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.preview[0]} 0%, ${currentTheme.preview[1]} 100%)`,
              boxShadow: `0 0 0 2px white, 0 0 0 3px ${currentTheme.preview[0]}40`,
            }}
          />
        </div>
        <span className="text-gray-700 dark:text-slate-200 hidden sm:inline">{isHindi ? 'थीम' : isMarathi ? 'थीम' : 'Theme'}</span>
        <svg
          className={`w-3 h-3 text-gray-400 dark:text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Tooltip for mobile */}
      <span className="sm:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/theme:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {isMarathi ? 'थीम' : 'Theme'}
      </span>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[1000]" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute left-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-[1001] min-w-[200px]">
            <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-700">
              <p className="text-[10px] uppercase tracking-wider text-[#999] dark:text-slate-400 font-semibold">
                {isHindi ? 'थीम चुनें' : isMarathi ? 'थीम निवडा' : 'Select Theme'}
              </p>
            </div>

            <div className="p-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                    currentTheme.id === theme.id
                      ? 'bg-gray-100 dark:bg-slate-700'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {/* Theme swatch */}
                  <div
                    className="w-8 h-8 rounded-lg border-2 shadow-sm flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${theme.preview[0]} 0%, ${theme.preview[1]} 100%)`,
                      borderColor: currentTheme.id === theme.id ? theme.preview[0] : 'white',
                    }}
                  />

                  {/* Theme name */}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-[#333] dark:text-slate-200">
                      {getThemeName(theme)}
                    </p>
                  </div>

                  {/* Checkmark */}
                  {currentTheme.id === theme.id && (
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: theme.preview[0] }}
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
