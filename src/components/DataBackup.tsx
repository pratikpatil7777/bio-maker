'use client';

import React, { useRef, useState } from 'react';
import { Language } from '@/lib/translations';
import { BiodataData, defaultData } from '@/lib/defaultData';

interface DataBackupProps {
  language: Language;
  data: BiodataData;
  themeId: string;
  borderId: string;
  onRestore: (data: BiodataData, themeId?: string, borderId?: string) => void;
}

interface BackupData {
  version: string;
  exportDate: string;
  themeId: string;
  borderId?: string;
  data: BiodataData;
}

export default function DataBackup({
  language,
  data,
  themeId,
  borderId,
  onRestore,
}: DataBackupProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMarathi = language === 'mr';

  const handleExport = () => {
    const backup: BackupData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      themeId,
      borderId,
      data,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biodata-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const backup = JSON.parse(text) as BackupData;

      // Validate the backup data structure
      if (!backup.data || !backup.version) {
        throw new Error('Invalid backup file format');
      }

      // Confirm restore
      const confirmed = confirm(
        isMarathi
          ? 'सध्याचा डेटा बॅकअप डेटाने बदलला जाईल. पुढे जायचे?'
          : 'Current data will be replaced with backup data. Continue?'
      );

      if (confirmed) {
        onRestore(backup.data, backup.themeId, backup.borderId);
        alert(isMarathi ? 'डेटा यशस्वीरित्या पुनर्संचयित केला!' : 'Data restored successfully!');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert(
        isMarathi
          ? 'बॅकअप फाइल वाचता आली नाही. कृपया वैध JSON फाइल निवडा.'
          : 'Could not read backup file. Please select a valid JSON file.'
      );
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Backup Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isImporting}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
          isImporting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white border border-gray-200 text-[#555] hover:border-gray-300 shadow-sm cursor-pointer'
        }`}
      >
        {isImporting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{isMarathi ? 'आयात करत आहे...' : 'Importing...'}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <span>{isMarathi ? 'बॅकअप' : 'Backup'}</span>
            <svg
              className={`w-3 h-3 transition-transform ${showMenu ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && !isImporting && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[180px]">
            {/* Export */}
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">{isMarathi ? 'निर्यात करा' : 'Export'}</p>
                <p className="text-xs text-[#777]">{isMarathi ? 'JSON म्हणून डाउनलोड' : 'Download as JSON'}</p>
              </div>
            </button>

            {/* Import */}
            <button
              onClick={handleImportClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">{isMarathi ? 'आयात करा' : 'Import'}</p>
                <p className="text-xs text-[#777]">{isMarathi ? 'बॅकअप पुनर्संचयित करा' : 'Restore backup'}</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
