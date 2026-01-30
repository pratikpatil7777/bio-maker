'use client';

import React, { useRef, useState } from 'react';
import { DynamicBiodataData, BiodataBackup, Language } from '@/lib/types';
import { useAlert } from './AlertDialog';

interface DataBackupNewProps {
  language: Language;
  data: DynamicBiodataData;
  onRestore: (data: DynamicBiodataData) => void;
}

export default function DataBackupNew({ language, data, onRestore }: DataBackupNewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';
  const { showError, showWarning, showConfirm } = useAlert();

  // Trilingual text helper
  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  const handleExport = () => {
    const backup: BiodataBackup = {
      version: '2.0.0',
      exportDate: new Date().toISOString(),
      data: data,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = data.name || 'biodata';
    a.download = `${name.replace(/\s+/g, '_')}_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const backup = JSON.parse(content) as BiodataBackup;

        // Validate the backup structure
        if (!backup.data || !backup.version) {
          await showError(
            getText(
              'Invalid backup file. Please select a valid backup file.',
              'अमान्य बैकअप फ़ाइल। कृपया वैध फ़ाइल चुनें।',
              'अवैध बॅकअप फाइल. कृपया योग्य फाइल निवडा.'
            ),
            getText('Invalid File', 'अमान्य फ़ाइल', 'अवैध फाइल')
          );
          return;
        }

        // Check version compatibility
        if (backup.version.startsWith('1.')) {
          await showWarning(
            getText(
              'This is an old version backup file. Please create a new backup.',
              'यह पुराने संस्करण की बैकअप फ़ाइल है। कृपया नया बैकअप बनाएं।',
              'ही जुन्या आवृत्तीची बॅकअप फाइल आहे. कृपया नवीन बॅकअप बनवा.'
            ),
            getText('Old Version', 'पुराना संस्करण', 'जुनी आवृत्ती')
          );
          return;
        }

        const backupDate = new Date(backup.exportDate).toLocaleDateString();
        const name = backup.data.name || getText('Not available', 'उपलब्ध नहीं', 'उपलब्ध नाही');
        const confirmMessage = getText(
          `All current data will be replaced with this backup.\n\nBackup date: ${backupDate}\nName: ${name}`,
          `वर्तमान सभी डेटा इस बैकअप से बदल दिया जाएगा।\n\nबैकअप तारीख: ${backupDate}\nनाम: ${name}`,
          `सध्याचा सर्व डेटा या बॅकअपने बदलला जाईल.\n\nबॅकअप तारीख: ${backupDate}\nनाव: ${name}`
        );

        const confirmed = await showConfirm(confirmMessage, {
          title: getText('Restore Backup?', 'बैकअप पुनर्स्थापित करें?', 'बॅकअप पुनर्संचयित करा?'),
          confirmText: getText('Restore', 'पुनर्स्थापित करें', 'पुनर्संचयित करा'),
          cancelText: getText('Cancel', 'रद्द करें', 'रद्द करा'),
        });

        if (confirmed) {
          onRestore(backup.data);
        }
      } catch (error) {
        await showError(
          getText(
            'Error reading file. Please select a valid JSON file.',
            'फ़ाइल पढ़ने में त्रुटि। कृपया वैध JSON फ़ाइल चुनें।',
            'फाइल वाचताना त्रुटी आली. कृपया वैध JSON फाइल निवडा.'
          ),
          getText('Error', 'त्रुटि', 'त्रुटी')
        );
      }
    };
    reader.readAsText(file);

    // Reset input
    e.target.value = '';
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group/backup h-9 flex items-center gap-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/60 hover:shadow-md shadow-sm transition-all duration-300 cursor-pointer"
        title={isMarathi ? 'डेटा बॅकअप' : 'Data Backup'}
      >
        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span className="hidden sm:inline">{isMarathi ? 'बॅकअप' : 'Backup'}</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[1000]"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-[1001] overflow-hidden">
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isMarathi ? 'निर्यात करा (JSON)' : 'Export (JSON)'}
            </button>

            <button
              onClick={handleImport}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-700 dark:hover:text-amber-400 transition-colors border-t border-gray-100 dark:border-slate-700 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {isMarathi ? 'आयात करा (JSON)' : 'Import (JSON)'}
            </button>
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
