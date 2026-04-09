'use client';

import React, { useState, useRef } from 'react';
import { Language } from '@/lib/types';
import { DynamicBiodataData } from '@/lib/types';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAlert } from './AlertDialog';

interface SettingsMenuProps {
  language: Language;
  data: DynamicBiodataData;
  onRestore: (data: DynamicBiodataData) => void;
  onReset: () => void;
}

export default function SettingsMenu({
  language,
  data,
  onRestore,
  onReset,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useDarkMode();
  const { toast, showError, showConfirm } = useAlert();

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const handleExport = () => {
    const backup = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      data: data,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biodata-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(getText('Backup exported!', 'बैकअप निर्यात हुआ!', 'बॅकअप निर्यात झाला!'));
    setIsOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const backup = JSON.parse(text);

      if (!backup.data || !backup.version) {
        throw new Error('Invalid backup format');
      }

      const confirmed = await showConfirm(
        getText(
          'This will replace your current biodata. Continue?',
          'यह आपके वर्तमान बायोडाटा को बदल देगा। जारी रखें?',
          'हे तुमचा सध्याचा बायोडाटा बदलेल. पुढे जायचे?'
        ),
        {
          title: getText('Import Backup', 'बैकअप आयात करें', 'बॅकअप आयात करा'),
          confirmText: getText('Yes, Import', 'हाँ, आयात करें', 'होय, आयात करा'),
          cancelText: getText('Cancel', 'रद्द करें', 'रद्द करा'),
        }
      );

      if (confirmed) {
        onRestore(backup.data);
        toast.success(getText('Backup restored!', 'बैकअप पुनर्स्थापित!', 'बॅकअप पुनर्संचयित!'));
      }
    } catch (error) {
      showError(
        getText('Invalid backup file.', 'अमान्य बैकअप फ़ाइल।', 'अवैध बॅकअप फाइल.'),
        getText('Import Failed', 'आयात विफल', 'आयात अयशस्वी')
      );
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsOpen(false);
  };

  const handleReset = async () => {
    setIsOpen(false);
    onReset();
  };

  return (
    <div className="relative">
      {/* Settings Button - Touch-friendly */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 xs:h-9 xs:w-9 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-amber-400 touch-target"
        title={getText('Settings', 'सेटिंग्स', 'सेटिंग्ज')}
      >
        <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Dropdown - Responsive positioning and touch-friendly */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 sm:right-0 left-auto top-full mt-2 z-[101] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 overflow-hidden min-w-[200px] max-w-[calc(100vw-16px)] sm:max-w-none">
            {/* Dark Mode Toggle - Touch-friendly */}
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-4 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors active:bg-gray-100 dark:active:bg-slate-600"
            >
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                {isDark ? (
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{isDark ? getText('Light Mode', 'लाइट मोड', 'लाइट मोड') : getText('Dark Mode', 'डार्क मोड', 'डार्क मोड')}</span>
            </button>

            <div className="border-t border-gray-100 dark:border-slate-700" />

            {/* Export Backup - Touch-friendly */}
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-3 px-4 py-4 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors active:bg-gray-100 dark:active:bg-slate-600"
            >
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="font-medium">{getText('Export Backup', 'बैकअप निर्यात करें', 'बॅकअप निर्यात करा')}</span>
            </button>

            {/* Import Backup - Touch-friendly */}
            <button
              onClick={handleImportClick}
              className="w-full flex items-center gap-3 px-4 py-4 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors active:bg-gray-100 dark:active:bg-slate-600"
            >
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <span className="font-medium">{getText('Import Backup', 'बैकअप आयात करें', 'बॅकअप आयात करा')}</span>
            </button>

            <div className="border-t border-gray-100 dark:border-slate-700" />

            {/* Reset - Touch-friendly */}
            <button
              onClick={handleReset}
              className="w-full flex items-center gap-3 px-4 py-4 sm:py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors active:bg-red-100 dark:active:bg-red-900/30"
            >
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <span className="font-medium">{getText('Reset All', 'सब रीसेट करें', 'सर्व रीसेट करा')}</span>
            </button>
          </div>
        </>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
