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
      className="min-h-screen py-8 px-4 transition-colors duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
          : 'linear-gradient(to bottom right, #FFFEF0, #FFF9E6, #FFF5D6)'
      }}
    >
      <div className="max-w-4xl mx-auto">
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
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                language === 'en'
                  ? 'bg-amber-500 text-white shadow'
                  : isDark ? 'text-amber-300 hover:bg-slate-700' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
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
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
              🎨
            </span>
            {isMarathi ? 'थीम निवडा' : 'Choose Your Theme'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme)}
                className={`relative p-3 rounded-xl border-2 transition-all ${
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
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
              🖼️
            </span>
            {isMarathi ? 'बॉर्डर डिझाइन निवडा' : 'Choose Border Design'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {borderDesigns.map((border) => (
              <button
                key={border.id}
                onClick={() => onBorderChange(border)}
                className={`relative p-2 rounded-xl border-2 transition-all ${
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

        {/* Preview Card */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${isDark ? 'bg-slate-800/80' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
              👁️
            </span>
            {isMarathi ? 'पूर्वावलोकन' : 'Preview'}
          </h2>
          <div className="flex justify-center">
            <div
              className="relative w-48 h-64 rounded-lg shadow-lg overflow-hidden"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <BorderRenderer
                borderId={currentBorder.id}
                primaryColor={currentTheme.colors.primary}
                secondaryColor={currentTheme.colors.secondary}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: currentTheme.colors.primary, opacity: 0.3 }} />
                <div className="w-20 h-2 rounded mb-3" style={{ backgroundColor: currentTheme.colors.headerText, opacity: 0.3 }} />
                <div className="space-y-1.5 w-full px-4">
                  <div className="w-full h-1.5 rounded" style={{ backgroundColor: currentTheme.colors.primary, opacity: 0.2 }} />
                  <div className="w-3/4 h-1.5 rounded" style={{ backgroundColor: currentTheme.colors.primary, opacity: 0.2 }} />
                  <div className="w-5/6 h-1.5 rounded" style={{ backgroundColor: currentTheme.colors.primary, opacity: 0.2 }} />
                </div>
              </div>
            </div>
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
              className={`group relative p-6 rounded-xl border-2 transition-all text-left ${isDark ? 'border-slate-600 hover:border-amber-500 hover:bg-slate-700/50' : 'border-gray-200 hover:border-amber-400 hover:shadow-lg'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${isDark ? 'bg-gradient-to-br from-amber-500/30 to-amber-600/30' : 'bg-gradient-to-br from-amber-100 to-amber-200'}`}>
                  <svg className={`w-7 h-7 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Use Reference Template */}
            <button
              onClick={onUseTemplate}
              className={`group relative p-6 rounded-xl border-2 transition-all text-left ${isDark ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-800 hover:border-amber-400' : 'border-amber-300 bg-gradient-to-br from-amber-50 to-white hover:border-amber-500 hover:shadow-lg'}`}
            >
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow">
                {isMarathi ? 'शिफारस' : 'Recommended'}
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Template Preview Info */}
          <div className={`mt-6 p-4 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className={`font-medium mb-2 flex items-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isMarathi ? 'टेम्पलेटमध्ये काय आहे?' : 'What\'s in the template?'}
            </h4>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 text-xs ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'वैयक्तिक माहिती' : 'Personal Details'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'ज्योतिष माहिती' : 'Astrological Info'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'शिक्षण व करिअर' : 'Education & Career'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'कौटुंबिक माहिती' : 'Family Details'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'भावंडे' : 'Siblings'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'मालमत्ता' : 'Assets'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? 'संपर्क माहिती' : 'Contact Info'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {isMarathi ? '+ बरेच काही' : '+ More'}
              </span>
            </div>
          </div>
        </div>

        <p className={`text-center text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {isMarathi
            ? 'तुमचा डेटा तुमच्या ब्राउझरमध्ये सुरक्षितपणे जतन केला जातो'
            : 'Your data is securely saved in your browser'}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-xl p-5 text-center ${isDark ? 'bg-slate-800/60' : 'bg-white/80'}`}>
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {isMarathi ? 'पूर्णपणे सानुकूल' : 'Fully Customizable'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMarathi
                ? 'तुम्हाला हवे ते फील्ड जोडा'
                : 'Add only the fields you need'}
            </p>
          </div>
          <div className={`rounded-xl p-5 text-center ${isDark ? 'bg-slate-800/60' : 'bg-white/80'}`}>
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {isMarathi ? 'PDF डाउनलोड' : 'PDF Download'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMarathi
                ? 'A4 साइझमध्ये डाउनलोड करा'
                : 'Download in A4 size'}
            </p>
          </div>
          <div className={`rounded-xl p-5 text-center ${isDark ? 'bg-slate-800/60' : 'bg-white/80'}`}>
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
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
