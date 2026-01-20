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

  return (
    <div className="relative">
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all bg-white border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer"
      >
        {/* Current theme swatch */}
        <div
          className="w-4 h-4 rounded-full border border-white shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.preview[0]} 0%, ${currentTheme.preview[1]} 100%)`,
          }}
        />
        <span className="text-[#555]">{isMarathi ? 'थीम' : 'Theme'}</span>
        <svg
          className={`w-3 h-3 text-[#777] transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
          <div className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[200px]">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-[#999] font-semibold">
                {isMarathi ? 'थीम निवडा' : 'Select Theme'}
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
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
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
                    <p className="text-sm font-medium text-[#333]">
                      {isMarathi ? theme.nameMarathi : theme.name}
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
