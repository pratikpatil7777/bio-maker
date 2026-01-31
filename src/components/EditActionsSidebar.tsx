'use client';

import React from 'react';
import { Language } from '@/lib/types';

interface EditActionsSidebarProps {
  language: Language;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  hasChanges: boolean;
}

export default function EditActionsSidebar({
  language,
  isEditMode,
  onToggleEditMode,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  hasChanges,
}: EditActionsSidebarProps) {
  // Trilingual text helper
  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  return (
    <>
      {/* Desktop Sidebar - Right side of template */}
      <div className="no-print hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-1.5 flex flex-col gap-1">
          {/* Undo Button */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              canUndo
                ? 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 cursor-pointer'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
            }`}
            title={getText('Undo (Ctrl+Z)', 'पूर्ववत करें (Ctrl+Z)', 'पूर्ववत करा (Ctrl+Z)')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            {/* Tooltip */}
            <span className="absolute right-full mr-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 dark:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {getText('Undo', 'पूर्ववत', 'पूर्ववत')}
            </span>
          </button>

          {/* Redo Button */}
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              canRedo
                ? 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 cursor-pointer'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
            }`}
            title={getText('Redo (Ctrl+Y)', 'पुनः करें (Ctrl+Y)', 'पुन्हा करा (Ctrl+Y)')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
            {/* Tooltip */}
            <span className="absolute right-full mr-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 dark:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {getText('Redo', 'पुनः करें', 'पुन्हा करा')}
            </span>
          </button>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-slate-600 mx-1" />

          {/* Edit/Save Toggle Button */}
          <button
            onClick={onToggleEditMode}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isEditMode
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30'
            } cursor-pointer`}
            title={isEditMode
              ? getText('Save & Preview', 'सहेजें और देखें', 'जतन करा आणि पहा')
              : getText('Edit Biodata', 'बायोडाटा संपादित करें', 'बायोडाटा संपादित करा')
            }
          >
            {isEditMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            )}
            {/* Tooltip */}
            <span className="absolute right-full mr-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 dark:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {isEditMode ? getText('Save', 'सहेजें', 'जतन करा') : getText('Edit', 'संपादित करें', 'संपादित करा')}
            </span>
          </button>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-slate-600 mx-1" />

          {/* Reset Button */}
          <button
            onClick={onReset}
            disabled={!hasChanges}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              hasChanges
                ? 'bg-gray-50 dark:bg-slate-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 cursor-pointer'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
            }`}
            title={getText('Reset to Default', 'डिफ़ॉल्ट पर रीसेट करें', 'डीफॉल्टवर रीसेट करा')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {/* Tooltip */}
            <span className="absolute right-full mr-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 dark:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {getText('Reset', 'रीसेट', 'रीसेट')}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Bottom Bar */}
      <div className="no-print lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 px-2 py-1.5 flex items-center gap-1">
          {/* Undo Button */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              canUndo
                ? 'text-gray-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600'
                : 'text-gray-300 dark:text-slate-600'
            }`}
            title={getText('Undo', 'पूर्ववत', 'पूर्ववत')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>

          {/* Redo Button */}
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              canRedo
                ? 'text-gray-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600'
                : 'text-gray-300 dark:text-slate-600'
            }`}
            title={getText('Redo', 'पुनः करें', 'पुन्हा करा')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-600" />

          {/* Edit/Save Toggle Button */}
          <button
            onClick={onToggleEditMode}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              isEditMode
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
            }`}
            title={isEditMode ? getText('Save', 'सहेजें', 'जतन करा') : getText('Edit', 'संपादित करें', 'संपादित करा')}
          >
            {isEditMode ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-600" />

          {/* Reset Button */}
          <button
            onClick={onReset}
            disabled={!hasChanges}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              hasChanges
                ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'text-gray-300 dark:text-slate-600'
            }`}
            title={getText('Reset', 'रीसेट', 'रीसेट')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
