'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/lib/DarkModeContext';
import { DynamicBiodataData, createEmptyBiodata } from '@/lib/types';

const STORAGE_KEY = 'biodata-builder-data';

export default function ExportPage() {
  const { isDark } = useDarkMode();
  const [data, setData] = useState<DynamicBiodataData | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'image'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        // Check if there's actual content
        const hasSections = parsed.sections && parsed.sections.length > 0;
        const hasName = parsed.header?.name;
        setHasData(hasSections || hasName);
      } catch {
        setData(createEmptyBiodata());
        setHasData(false);
      }
    } else {
      setData(createEmptyBiodata());
      setHasData(false);
    }
  }, []);

  const handleExport = async () => {
    if (!hasData) return;

    setIsExporting(true);
    // Simulate export delay - actual export would use html2canvas/jspdf
    setTimeout(() => {
      setIsExporting(false);
      // Redirect to builder where actual export functionality exists
      window.location.href = '/app';
    }, 1000);
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Print-ready format, perfect for matrimonial purposes',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-6 4h6" />
        </svg>
      ),
      features: ['A4 Size', 'Print Ready', 'Vector Graphics'],
    },
    {
      id: 'image',
      title: 'High-Quality Image',
      description: 'PNG format for sharing on social media or WhatsApp',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: ['HD Quality', 'Transparent BG', 'Social Ready'],
    },
  ];

  return (
    <div className={`min-h-[calc(100vh-80px)] py-8 px-4 ${isDark ? 'bg-slate-900' : 'bg-[#FFFEF8]'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Export Your Biodata
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Download your beautiful biodata in your preferred format
          </p>
        </motion.div>

        {!hasData ? (
          /* No Data State */
          <motion.div
            className={`text-center py-16 rounded-3xl ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-6">📝</div>
            <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Biodata Found
            </h2>
            <p className={`mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create your biodata first before exporting. It only takes a few minutes!
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Biodata
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Export Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {exportOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => setExportFormat(option.id as 'pdf' | 'image')}
                  className={`relative p-6 rounded-2xl text-left transition-all cursor-pointer ${
                    exportFormat === option.id
                      ? isDark
                        ? 'bg-amber-500/20 border-2 border-amber-500'
                        : 'bg-amber-50 border-2 border-amber-500'
                      : isDark
                        ? 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                        : 'bg-white border-2 border-transparent hover:border-gray-200 shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Selected Badge */}
                  {exportFormat === option.id && (
                    <motion.div
                      className="absolute top-4 right-4 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    exportFormat === option.id
                      ? 'bg-amber-500 text-white'
                      : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {option.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature) => (
                      <span
                        key={feature}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Export Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className={`mb-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Your biodata will be exported on your device. We never store your data.
              </p>

              <Link
                href="/app"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Go to Builder to Export
                  </>
                )}
              </Link>

              <p className={`mt-6 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                Full export controls are available in the biodata builder
              </p>
            </motion.div>
          </>
        )}

        {/* Privacy Note */}
        <motion.div
          className={`mt-12 p-6 rounded-2xl text-center ${isDark ? 'bg-slate-800/30' : 'bg-amber-50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              100% Private Export
            </span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            All exports are processed locally on your device. Your data never leaves your browser.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
