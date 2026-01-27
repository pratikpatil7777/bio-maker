'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';
import BorderRenderer from './borders';
import DarkModeToggle from './DarkModeToggle';
import { useDarkMode } from '@/lib/DarkModeContext';

interface EmptyStateProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  currentBorder: BorderDesign;
  onBorderChange: (border: BorderDesign) => void;
  onStartBuilding: () => void;
  onUseTemplate: () => void;
}

// Floating decorative elements for background
const FloatingElements = ({ isDark }: { isDark: boolean }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Floating Lotus Petals */}
    {[...Array(6)].map((_, i) => (
      <div
        key={`petal-${i}`}
        className="absolute animate-float-slow"
        style={{
          left: `${10 + i * 15}%`,
          top: `${-10 + (i % 3) * 5}%`,
          animationDelay: `${i * 2}s`,
          animationDuration: `${15 + i * 3}s`,
        }}
      >
        <svg
          width="30"
          height="40"
          viewBox="0 0 30 40"
          className={`${isDark ? 'text-amber-500/10' : 'text-amber-400/20'}`}
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <path
            d="M15 0C15 0 25 15 25 25C25 35 20 40 15 40C10 40 5 35 5 25C5 15 15 0 15 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    ))}

    {/* Floating Golden Particles */}
    {[...Array(12)].map((_, i) => (
      <div
        key={`particle-${i}`}
        className="absolute rounded-full animate-float-particle"
        style={{
          width: `${4 + (i % 3) * 2}px`,
          height: `${4 + (i % 3) * 2}px`,
          left: `${5 + i * 8}%`,
          top: `${20 + (i % 4) * 20}%`,
          background: isDark
            ? `radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${8 + (i % 4) * 2}s`,
        }}
      />
    ))}

    {/* Subtle Paisley Patterns */}
    <svg
      className={`absolute top-20 left-10 w-32 h-32 animate-spin-very-slow ${isDark ? 'text-amber-500/5' : 'text-amber-400/10'}`}
      viewBox="0 0 100 100"
    >
      <path
        d="M50 10C50 10 70 30 70 50C70 65 60 70 50 70C40 70 30 65 30 50C30 30 50 10 50 10Z"
        fill="currentColor"
      />
      <circle cx="50" cy="45" r="8" fill="currentColor" opacity="0.5" />
    </svg>

    <svg
      className={`absolute bottom-32 right-20 w-40 h-40 animate-spin-very-slow-reverse ${isDark ? 'text-amber-500/5' : 'text-amber-400/10'}`}
      viewBox="0 0 100 100"
    >
      <path
        d="M50 10C50 10 70 30 70 50C70 65 60 70 50 70C40 70 30 65 30 50C30 30 50 10 50 10Z"
        fill="currentColor"
      />
      <circle cx="50" cy="45" r="8" fill="currentColor" opacity="0.5" />
    </svg>

    {/* Corner Mandala Accents */}
    <div className={`absolute top-0 left-0 w-48 h-48 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500">
        <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {[0, 45, 90].map((angle) => (
          <line key={angle} x1="0" y1="0" x2="50" y2="0" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${angle})`} />
        ))}
      </svg>
    </div>

    <div className={`absolute bottom-0 right-0 w-48 h-48 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500">
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {[180, 225, 270].map((angle) => (
          <line key={angle} x1="100" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${angle} 100 100)`} />
        ))}
      </svg>
    </div>
  </div>
);

export default function EmptyState({
  language,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  currentBorder,
  onBorderChange,
  onStartBuilding,
  onUseTemplate,
}: EmptyStateProps) {
  const isMarathi = language === 'mr';
  const { isDark } = useDarkMode();

  return (
    <main
      className="min-h-screen py-8 px-4 transition-colors duration-300 relative overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
          : 'linear-gradient(to bottom right, #FFFEF0, #FFF9E6, #FFF5D6)'
      }}
    >
      {/* Animated Background */}
      <FloatingElements isDark={isDark} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Dark Mode Toggle - Top Right */}
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* Krishna Icon */}
            <div className="relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-gradient-to-br from-amber-900/50 to-amber-800/50' : 'bg-gradient-to-br from-amber-100 to-amber-200'}`}>
                <svg width="50" height="50" viewBox="0 0 100 100" className="text-amber-600">
                  <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.9" />
                  <ellipse cx="50" cy="72" rx="20" ry="25" fill="currentColor" opacity="0.8" />
                  <path d="M30 30 Q50 5 70 30" stroke="currentColor" strokeWidth="3" fill="none" />
                  <circle cx="35" cy="20" r="4" fill="currentColor" />
                  <circle cx="65" cy="20" r="4" fill="currentColor" />
                  <path d="M25 60 Q15 50 20 40" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M75 60 Q85 50 80 40" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <ellipse cx="20" cy="38" rx="4" ry="6" fill="currentColor" opacity="0.6" />
                  <ellipse cx="80" cy="38" rx="4" ry="6" fill="currentColor" opacity="0.6" />
                  <path d="M70 55 Q90 55 95 35 Q90 30 85 35 Q87 45 70 50" fill="currentColor" opacity="0.7" />
                  <circle cx="92" cy="32" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
            {isMarathi ? 'विवाह बायोडाटा निर्माता' : 'Marriage Biodata Builder'}
          </h1>
          <p className={`text-lg ${isDark ? 'text-amber-300/80' : 'text-amber-600'}`}>
            {isMarathi
              ? 'तुमचा सुंदर विवाह बायोडाटा काही मिनिटांत तयार करा'
              : 'Create your beautiful marriage biodata in minutes'}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-lg border p-1 shadow-sm ${isDark ? 'border-slate-600 bg-slate-800' : 'border-amber-200 bg-white'}`}>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-white shadow'
                  : isDark ? 'text-amber-300 hover:bg-slate-700' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                language === 'mr'
                  ? 'bg-amber-500 text-white shadow'
                  : isDark ? 'text-amber-300 hover:bg-slate-700' : 'text-amber-700 hover:bg-amber-50'
              }`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className={`rounded-2xl shadow-lg p-6 mb-6 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30' : 'bg-gradient-to-br from-amber-100 to-orange-100'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </span>
            {isMarathi ? 'थीम निवडा' : 'Choose Your Theme'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme)}
                className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  currentTheme.id === theme.id
                    ? 'border-amber-500 shadow-lg scale-105'
                    : isDark ? 'border-slate-600 hover:border-amber-400 hover:shadow' : 'border-gray-200 hover:border-amber-300 hover:shadow'
                }`}
              >
                {currentTheme.id === theme.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="flex gap-1 mb-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: theme.colors.background }} />
                </div>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? theme.nameMarathi : theme.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Border Selection */}
        <div className={`rounded-2xl shadow-lg p-6 mb-6 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30' : 'bg-gradient-to-br from-amber-100 to-orange-100'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="6" y="6" width="12" height="12" rx="1" strokeDasharray="2 2" />
                <path d="M3 7h2M3 12h2M3 17h2M19 7h2M19 12h2M19 17h2M7 3v2M12 3v2M17 3v2M7 19v2M12 19v2M17 19v2" strokeWidth="1" />
              </svg>
            </span>
            {isMarathi ? 'बॉर्डर डिझाइन निवडा' : 'Choose Border Design'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {borderDesigns.map((border) => (
              <button
                key={border.id}
                onClick={() => onBorderChange(border)}
                className={`relative p-2 rounded-xl border-2 transition-all cursor-pointer ${
                  currentBorder.id === border.id
                    ? 'border-amber-500 shadow-lg scale-105'
                    : isDark ? 'border-slate-600 hover:border-amber-400 hover:shadow' : 'border-gray-200 hover:border-amber-300 hover:shadow'
                }`}
              >
                {currentBorder.id === border.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center z-10">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
                  <BorderRenderer
                    borderId={border.id}
                    primaryColor={currentTheme.colors.primary}
                    secondaryColor={currentTheme.colors.secondary}
                  />
                </div>
                <p className={`text-xs font-medium mt-2 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? border.nameMarathi : border.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Start Options */}
        <div className={`rounded-2xl shadow-lg p-8 mb-8 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-6 text-center ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {isMarathi ? 'कसे सुरू करायचे?' : 'How would you like to start?'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Start from Scratch */}
            <button
              onClick={onStartBuilding}
              className={`group relative p-6 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-xl cursor-pointer ${isDark ? 'border-slate-600 hover:border-amber-500 hover:bg-slate-700/50' : 'border-gray-200 hover:border-amber-400'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${isDark ? 'bg-gradient-to-br from-slate-600 to-slate-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                  <svg className={`w-7 h-7 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" opacity="0.3"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {isMarathi ? 'रिक्त बायोडाटा' : 'Start from Scratch'}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isMarathi
                      ? 'स्वतःहून सर्व विभाग आणि फील्ड जोडा'
                      : 'Add your own sections and fields from the beginning'}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </div>
            </button>

            {/* Use Reference Template */}
            <button
              onClick={onUseTemplate}
              className={`group relative p-6 rounded-2xl border-2 transition-all text-left shadow-md hover:shadow-xl cursor-pointer ${isDark ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-800 hover:border-amber-400' : 'border-amber-300 bg-gradient-to-br from-amber-50 to-white hover:border-amber-500'}`}
            >
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                {isMarathi ? 'शिफारस' : 'Recommended'}
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                    <path d="M8 15.01V17h1.99l5.88-5.88-1.99-1.99L8 15.01zm7.66-4.95l-1.41-1.41-.71.71 1.41 1.41.71-.71z" opacity="0.8"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {isMarathi ? 'संदर्भ टेम्पलेट वापरा' : 'Use Reference Template'}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isMarathi
                      ? 'पूर्व-भरलेला नमुना पाहा आणि संपादित करा'
                      : 'Start with a pre-filled sample and customize it'}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </div>
            </button>
          </div>

        </div>

        <p className={`text-center text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {isMarathi
            ? 'तुमचा डेटा तुमच्या ब्राउझरमध्ये सुरक्षितपणे जतन केला जातो'
            : 'Your data is securely saved in your browser'}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 text-center shadow-lg transition-transform hover:scale-105 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30' : 'bg-gradient-to-br from-emerald-100 to-teal-100'}`}>
              <svg className={`w-7 h-7 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {isMarathi ? 'पूर्णपणे सानुकूल' : 'Fully Customizable'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMarathi
                ? 'तुम्हाला हवे ते फील्ड जोडा'
                : 'Add only the fields you need'}
            </p>
          </div>
          <div className={`rounded-2xl p-6 text-center shadow-lg transition-transform hover:scale-105 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-rose-500/30 to-pink-500/30' : 'bg-gradient-to-br from-rose-100 to-pink-100'}`}>
              <svg className={`w-7 h-7 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {isMarathi ? 'PDF डाउनलोड' : 'PDF Download'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMarathi
                ? 'A4 साइझमध्ये डाउनलोड करा'
                : 'Download in A4 size'}
            </p>
          </div>
          <div className={`rounded-2xl p-6 text-center shadow-lg transition-transform hover:scale-105 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/30' : 'bg-gradient-to-br from-violet-100 to-purple-100'}`}>
              <svg className={`w-7 h-7 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {isMarathi ? 'द्विभाषिक' : 'Bilingual'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMarathi
                ? 'इंग्रजी आणि मराठी दोन्ही'
                : 'English & Marathi support'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
