'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/lib/DarkModeContext';
import { DynamicBiodataData, createEmptyBiodata } from '@/lib/types';

const STORAGE_KEY = 'biodata-builder-data';

type ShareMode = 'full' | 'limited';

interface ShareOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const shareOptions: ShareOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: '#25D366',
    description: 'Share directly to contacts or groups',
  },
  {
    id: 'link',
    name: 'Copy Link',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    ),
    color: '#6366F1',
    description: 'Generate a shareable link',
  },
  {
    id: 'email',
    name: 'Email',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#EF4444',
    description: 'Send as email attachment',
  },
];

export default function SharePage() {
  const { isDark } = useDarkMode();
  const [data, setData] = useState<DynamicBiodataData | null>(null);
  const [shareMode, setShareMode] = useState<ShareMode>('full');
  const [hasData, setHasData] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleShare = (optionId: string) => {
    // Redirect to builder where actual share functionality exists
    window.location.href = '/app';
  };

  const limitedShareInfo = [
    'Name and Photo',
    'Basic personal details (age, height)',
    'Education & Occupation',
    'Contact info hidden',
    'Family details hidden',
  ];

  const fullShareInfo = [
    'All biodata sections',
    'Complete family details',
    'Full contact information',
    'Partner preferences',
    'All photos included',
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
            Share Your Biodata
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose how you want to share your biodata with potential matches
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
              No Biodata to Share
            </h2>
            <p className={`mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create your biodata first before sharing. It only takes a few minutes!
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
            {/* Share Mode Selection */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose Privacy Level
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Limited Share */}
                <button
                  onClick={() => setShareMode('limited')}
                  className={`relative p-5 rounded-2xl text-left transition-all cursor-pointer ${
                    shareMode === 'limited'
                      ? isDark
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-blue-50 border-2 border-blue-500'
                      : isDark
                        ? 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                        : 'bg-white border-2 border-transparent hover:border-gray-200 shadow-md'
                  }`}
                >
                  {shareMode === 'limited' && (
                    <motion.div
                      className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      shareMode === 'limited' ? 'bg-blue-500 text-white' : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Limited Share</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Recommended for initial sharing</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {limitedShareInfo.map((info, i) => (
                      <li key={i} className={`text-xs flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className={i < 3 ? 'text-green-500' : 'text-red-400'}>{i < 3 ? '✓' : '✗'}</span>
                        {info}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Full Share */}
                <button
                  onClick={() => setShareMode('full')}
                  className={`relative p-5 rounded-2xl text-left transition-all cursor-pointer ${
                    shareMode === 'full'
                      ? isDark
                        ? 'bg-amber-500/20 border-2 border-amber-500'
                        : 'bg-amber-50 border-2 border-amber-500'
                      : isDark
                        ? 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                        : 'bg-white border-2 border-transparent hover:border-gray-200 shadow-md'
                  }`}
                >
                  {shareMode === 'full' && (
                    <motion.div
                      className="absolute top-3 right-3 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      shareMode === 'full' ? 'bg-amber-500 text-white' : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Full Share</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Complete biodata access</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {fullShareInfo.map((info, i) => (
                      <li key={i} className={`text-xs flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="text-green-500">✓</span>
                        {info}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </motion.div>

            {/* Share Options */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Share Via
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleShare(option.id)}
                    className={`p-5 rounded-2xl text-center transition-all cursor-pointer ${
                      isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-lg shadow-md'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white"
                      style={{ backgroundColor: option.color }}
                    >
                      {option.icon}
                    </div>
                    <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {option.name}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {option.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Go to Builder CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/app"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Go to Builder to Share
              </Link>
              <p className={`mt-4 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                Full sharing controls are available in the biodata builder
              </p>
            </motion.div>
          </>
        )}

        {/* Privacy Note */}
        <motion.div
          className={`mt-12 p-6 rounded-2xl text-center ${isDark ? 'bg-slate-800/30' : 'bg-green-50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Safe Sharing
            </span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            With limited share, you control exactly what information is visible to potential matches.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
