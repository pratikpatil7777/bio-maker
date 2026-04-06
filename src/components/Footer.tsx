'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';

interface FooterProps {
  language: Language;
  showThankYou?: boolean;
  isEditMode?: boolean;
  onToggleThankYou?: () => void;
}

export default function Footer({
  language,
  showThankYou = true,
  isEditMode = false,
  onToggleThankYou,
}: FooterProps) {
  const t = translations[language];

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  // If not showing thank you and not in edit mode, render nothing
  // In edit mode, we always show it (grayed out when hidden)
  if (!showThankYou && !isEditMode) {
    return null;
  }

  return (
    <footer className="text-center pt-6 pb-2">
      {/* Thank You text with inline toggle button */}
      <div className="inline-block relative">
        {/* Edit mode toggle button - positioned at top right of text */}
        {isEditMode && onToggleThankYou && (
          <button
            onClick={onToggleThankYou}
            className={`biodata-btn absolute -top-2 -right-8 z-20 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
              showThankYou
                ? 'bg-white border-2 border-amber-400 text-amber-500 hover:bg-amber-50'
                : 'bg-gray-200 border-2 border-gray-400 text-gray-500 hover:bg-gray-300'
            }`}
            title={showThankYou
              ? getText('Hide Thank You', 'धन्यवाद छुपाएं', 'धन्यवाद लपवा')
              : getText('Show Thank You', 'धन्यवाद दिखाएं', 'धन्यवाद दाखवा')
            }
          >
            {showThankYou ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        )}

        {/* Thank You text - shown grayed out when hidden in edit mode */}
        <p
          className={`text-2xl script-font transition-opacity ${
            showThankYou ? 'text-[#800020]' : 'text-gray-400 opacity-50'
          }`}
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {t.thankYou}
        </p>
      </div>
    </footer>
  );
}
