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

  return (
    <div className="flex items-center gap-2">
      {/* Reset button - enabled only when in edit mode AND data has changed */}
      <button
        onClick={onReset}
        disabled={!canReset}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
          canReset
            ? 'text-[#800020] border border-[#800020] hover:bg-[#800020] hover:text-white cursor-pointer'
            : 'text-gray-400 border border-gray-300 cursor-not-allowed opacity-50'
        }`}
        title={!isEditMode ? 'Enable edit mode first' : !hasChanges ? 'No changes to reset' : t.resetToDefault}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isEditMode ? 'hover:rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span className="hidden sm:inline">{t.resetToDefault}</span>
      </button>

      {/* Edit/Save Button - Industry standard UX */}
      <button
        onClick={() => onToggle(!isEditMode)}
        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs cursor-pointer transition-all duration-300 overflow-hidden ${
          isEditMode
            ? 'bg-gradient-to-r from-[#28a745] to-[#218838] text-white shadow-md shadow-[#28a745]/30 hover:from-[#218838] hover:to-[#1e7e34]'
            : 'bg-gray-100 text-[#555] hover:bg-gray-200 border border-gray-300'
        }`}
      >
        {/* Icon - Pencil for Edit, Check for Save */}
        <span className="relative z-10">
          {isEditMode ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          )}
        </span>

        <span className="relative z-10">
          {isEditMode ? 'Save' : 'Edit'}
        </span>
      </button>
    </div>
  );
}
