'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';

interface EditModeToggleProps {
  language: Language;
  isEditMode: boolean;
  onToggle: (isEditMode: boolean) => void;
  onReset: () => void;
  hasChanges: boolean;
}

export default function EditModeToggle({
  language,
  isEditMode,
  onToggle,
  onReset,
  hasChanges,
}: EditModeToggleProps) {
  const t = translations[language];

  // Reset is only enabled when in edit mode AND there are changes from default
  const canReset = isEditMode && hasChanges;

  const isMarathi = language === 'mr';

  return (
    <div className="flex items-center gap-1.5">
      {/* Reset button - Unified styling */}
      <button
        onClick={onReset}
        disabled={!canReset}
        className={`group/reset h-9 flex items-center justify-center gap-1.5 px-3 text-xs font-medium rounded-lg transition-all duration-300 shadow-sm ${
          canReset
            ? 'bg-white dark:bg-slate-700 text-red-500 dark:text-red-400 border border-red-300 dark:border-red-500/50 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer hover:shadow-md'
            : 'bg-gray-50 dark:bg-slate-800 text-gray-300 dark:text-slate-600 border border-gray-200 dark:border-slate-700 cursor-not-allowed'
        }`}
        title={!isEditMode ? 'Enable edit mode first' : !hasChanges ? 'No changes to reset' : t.resetToDefault}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-500 ${canReset ? 'group-hover/reset:rotate-[-360deg]' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Edit/Save Toggle - Primary action button */}
      <button
        onClick={() => onToggle(!isEditMode)}
        className={`h-9 flex items-center justify-center gap-1.5 px-4 rounded-lg font-semibold text-xs cursor-pointer transition-all duration-300 ${
          isEditMode
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
            : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
        }`}
      >
        {isEditMode ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        )}
        <span>{isEditMode ? (isMarathi ? 'सेव्ह' : 'Save') : (isMarathi ? 'एडिट' : 'Edit')}</span>
      </button>
    </div>
  );
}
