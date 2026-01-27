'use client';

import React, { useRef, useState } from 'react';
import { DynamicBiodataData, BiodataBackup, Language } from '@/lib/types';

interface DataBackupNewProps {
  language: Language;
  data: DynamicBiodataData;
  onRestore: (data: DynamicBiodataData) => void;
}

export default function DataBackupNew({ language, data, onRestore }: DataBackupNewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMarathi = language === 'mr';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const backup = JSON.parse(content) as BiodataBackup;

        // Validate the backup structure
        if (!backup.data || !backup.version) {
          alert(isMarathi
            ? 'अवैध बॅकअप फाइल. कृपया योग्य फाइल निवडा.'
            : 'Invalid backup file. Please select a valid backup file.');
          return;
        }

        // Check version compatibility
        if (backup.version.startsWith('1.')) {
          alert(isMarathi
            ? 'ही जुन्या आवृत्तीची बॅकअप फाइल आहे. कृपया नवीन बॅकअप बनवा.'
            : 'This is an old version backup file. Please create a new backup.');
          return;
        }

        const confirmMessage = isMarathi
          ? `तुम्हाला खात्री आहे का? सध्याचा सर्व डेटा या बॅकअपने बदलला जाईल.\n\nबॅकअप तारीख: ${new Date(backup.exportDate).toLocaleDateString()}\nनाव: ${backup.data.name || 'उपलब्ध नाही'}`
          : `Are you sure? All current data will be replaced with this backup.\n\nBackup date: ${new Date(backup.exportDate).toLocaleDateString()}\nName: ${backup.data.name || 'Not available'}`;

        if (confirm(confirmMessage)) {
          onRestore(backup.data);
        }
      } catch (error) {
        alert(isMarathi
          ? 'फाइल वाचताना त्रुटी आली. कृपया वैध JSON फाइल निवडा.'
          : 'Error reading file. Please select a valid JSON file.');
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
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 text-[#555] shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
        title={isMarathi ? 'डेटा बॅकअप' : 'Data Backup'}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span className="hidden sm:inline">{isMarathi ? 'बॅकअप' : 'Backup'}</span>
        <svg className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isMarathi ? 'निर्यात करा (JSON)' : 'Export (JSON)'}
            </button>

            <button
              onClick={handleImport}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors border-t border-gray-100"
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
