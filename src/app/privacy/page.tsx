'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/lib/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';

const privacyPoints = [
  {
    icon: '💾',
    title: 'Local Storage Only',
    description: 'All your biodata information is stored locally in your browser. We never upload or store your data on any server.',
  },
  {
    icon: '🔐',
    title: 'No Account Required',
    description: 'You dont need to create an account or provide any personal information to use Bio Maker. Just open and start creating.',
  },
  {
    icon: '📱',
    title: 'Device-Only Processing',
    description: 'PDF and image generation happens entirely on your device. Your biodata never leaves your browser.',
  },
  {
    icon: '🚫',
    title: 'No Tracking',
    description: 'We dont use any tracking cookies or analytics that collect personal information. Your browsing is private.',
  },
  {
    icon: '🌐',
    title: 'Works Offline',
    description: 'After the first load, Bio Maker works completely offline. No internet connection means no data transmission.',
  },
  {
    icon: '🗑️',
    title: 'Easy Data Deletion',
    description: 'Want to delete your data? Simply clear your browser storage. Theres nothing on our servers to delete.',
  },
];

export default function PrivacyPage() {
  const { isDark } = useDarkMode();

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-[#FFFEF8]'}`}>
      {/* Navigation */}
      <nav className="py-4 px-6 sticky top-0 z-50">
        <div className={`max-w-6xl mx-auto flex justify-between items-center px-4 py-2 rounded-2xl backdrop-blur-md ${
          isDark ? 'bg-slate-900/70' : 'bg-white/70'
        } shadow-lg border ${isDark ? 'border-slate-700/50' : 'border-amber-200/50'}`}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={44} height={44} className="rounded-lg" priority />
            <span className={`hidden sm:block text-lg font-bold ${isDark ? 'text-amber-100' : 'text-[#800020]'}`}
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Bio Maker
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/app" className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl text-sm">
              Create Biodata
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Privacy Policy
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your privacy is our top priority. Bio Maker is designed to keep your personal information completely private.
          </p>
        </motion.div>
      </section>

      {/* Privacy Points */}
      <section className="py-8 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {privacyPoints.map((point, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {point.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-800/30' : 'bg-amber-50/50'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Full Privacy Policy
          </h2>

          <div className={`space-y-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Information We Collect
              </h3>
              <p>
                Bio Maker does not collect any personal information. All data you enter (name, family details,
                education, etc.) is stored exclusively in your browsers local storage and never transmitted
                to our servers or any third party.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Data Storage
              </h3>
              <p>
                Your biodata is stored using your browsers localStorage API. This means:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Data stays on your device only</li>
                <li>Clearing browser data will delete your biodata</li>
                <li>Different browsers/devices will have separate data</li>
                <li>We have no access to your stored data</li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Export & Sharing
              </h3>
              <p>
                When you export your biodata as PDF or image, the processing happens entirely on your device
                using client-side JavaScript. The files are generated locally and downloaded directly to your
                device. We never see or process these files.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Third-Party Services
              </h3>
              <p>
                Bio Maker may use minimal third-party services for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Hosting (static file serving only)</li>
                <li>Font delivery (Google Fonts)</li>
              </ul>
              <p className="mt-2">
                None of these services have access to your biodata content.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact
              </h3>
              <p>
                If you have any questions about this privacy policy, please contact us through our website.
              </p>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <p className="text-sm opacity-75">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Create Your Biodata?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Start creating with confidence knowing your data is completely private.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Creating Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
