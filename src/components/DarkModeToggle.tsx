'use client';

import React from 'react';
import { useDarkMode } from '@/lib/DarkModeContext';

interface DarkModeToggleProps {
  className?: string;
}

export default function DarkModeToggle({ className = '' }: DarkModeToggleProps) {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full transition-all duration-500 ease-in-out overflow-hidden group cursor-pointer ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(to right, #0f172a, #1e293b)'
          : 'linear-gradient(to right, #87CEEB, #FFE4B5)',
        boxShadow: isDark
          ? '0 0 15px rgba(147, 197, 253, 0.3), inset 0 2px 4px rgba(0,0,0,0.3)'
          : '0 0 15px rgba(255, 200, 100, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
      }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Stars - only visible in dark mode */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <span className="absolute top-3 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <span className="absolute top-1.5 left-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="absolute top-5 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <span className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Clouds - only visible in light mode */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="absolute top-2 left-1 w-4 h-2 bg-white/60 rounded-full blur-[1px]" />
        <span className="absolute top-4 left-6 w-3 h-1.5 bg-white/50 rounded-full blur-[1px]" />
      </div>

      {/* Sun/Moon Circle */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out transform ${
          isDark ? 'translate-x-9' : 'translate-x-1'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #f5f5f5 0%, #d4d4d4 100%)'
            : 'linear-gradient(135deg, #FDB813 0%, #FF8C00 100%)',
          boxShadow: isDark
            ? '0 0 10px rgba(255,255,255,0.5), inset -3px -2px 5px rgba(0,0,0,0.2)'
            : '0 0 20px rgba(255,200,50,0.8), 0 0 40px rgba(255,150,0,0.4)',
        }}
      >
        {/* Moon craters - only visible in dark mode */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="absolute top-1 left-2 w-2 h-2 bg-gray-300/50 rounded-full" />
          <span className="absolute top-3 left-1 w-1.5 h-1.5 bg-gray-300/40 rounded-full" />
          <span className="absolute top-2 right-1 w-1 h-1 bg-gray-300/30 rounded-full" />
        </div>

        {/* Sun rays - only visible in light mode */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-0.5 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-0.5 bg-yellow-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Hover effect ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
    </button>
  );
}

// Compact version for toolbar - Unified with other buttons
export function DarkModeToggleCompact({ className = '' }: DarkModeToggleProps) {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className={`h-9 flex items-center justify-center gap-1.5 px-3 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer border shadow-sm hover:shadow-md ${
        isDark
          ? 'bg-slate-700 text-amber-400 border-slate-600 hover:bg-slate-600'
          : 'bg-white text-amber-600 border-gray-200 hover:bg-amber-50 hover:border-amber-200'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Animated icon container */}
      <div className="relative w-4 h-4 overflow-hidden">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 transform ${
            isDark ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon icon */}
        <svg
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 transform ${
            isDark ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  );
}
