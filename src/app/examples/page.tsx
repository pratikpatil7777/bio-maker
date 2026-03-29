'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/lib/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';
import { themes } from '@/lib/themes';
import { borderDesigns } from '@/lib/borders';
import BorderRenderer from '@/components/borders';

const exampleBiodatas = [
  {
    id: 1,
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    theme: themes[0],
    border: borderDesigns[0],
    preview: {
      occupation: 'Software Engineer',
      education: 'B.Tech, Computer Science',
      location: 'Mumbai, Maharashtra',
    }
  },
  {
    id: 2,
    name: 'Rahul Deshmukh',
    nameHi: 'राहुल देशमुख',
    theme: themes[1],
    border: borderDesigns[1],
    preview: {
      occupation: 'Doctor (MBBS)',
      education: 'MBBS, MD Medicine',
      location: 'Pune, Maharashtra',
    }
  },
  {
    id: 3,
    name: 'Anjali Patel',
    nameHi: 'अंजलि पटेल',
    theme: themes[2],
    border: borderDesigns[2],
    preview: {
      occupation: 'Chartered Accountant',
      education: 'B.Com, CA',
      location: 'Ahmedabad, Gujarat',
    }
  },
  {
    id: 4,
    name: 'Vikram Singh',
    nameHi: 'विक्रम सिंह',
    theme: themes[3],
    border: borderDesigns[3],
    preview: {
      occupation: 'Business Owner',
      education: 'MBA, Finance',
      location: 'Delhi, NCR',
    }
  },
  {
    id: 5,
    name: 'Meera Kulkarni',
    nameHi: 'मीरा कुलकर्णी',
    theme: themes[4],
    border: borderDesigns[4],
    preview: {
      occupation: 'Teacher',
      education: 'M.A., B.Ed',
      location: 'Nagpur, Maharashtra',
    }
  },
  {
    id: 6,
    name: 'Arjun Reddy',
    nameHi: 'अर्जुन रेड्डी',
    theme: themes[5] || themes[0],
    border: borderDesigns[5] || borderDesigns[0],
    preview: {
      occupation: 'IAS Officer',
      education: 'B.A., LLB',
      location: 'Hyderabad, Telangana',
    }
  },
];

export default function ExamplesPage() {
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
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Example Biodatas
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            See how beautiful your biodata can look. These examples showcase different themes and styles.
          </p>
        </motion.div>
      </section>

      {/* Examples Grid */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {exampleBiodatas.map((example, index) => (
              <motion.div
                key={example.id}
                className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-xl'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Biodata Preview */}
                <div
                  className="aspect-[3/4] relative p-6"
                  style={{ backgroundColor: example.theme.colors.background }}
                >
                  <BorderRenderer
                    borderId={example.border.id}
                    primaryColor={example.theme.colors.primary}
                    secondaryColor={example.theme.colors.secondary}
                  />
                  <div className="relative z-10 h-full flex flex-col items-center text-center">
                    {/* Header */}
                    <div className="text-2xl mb-1" style={{ color: example.theme.colors.primary }}>ॐ</div>
                    <div className="text-xs font-medium mb-3" style={{ color: example.theme.colors.secondary }}>
                      || श्री गणेशाय नमः ||
                    </div>
                    <div className="text-xs font-bold mb-4" style={{ color: example.theme.colors.headerText }}>
                      MARRIAGE BIODATA
                    </div>

                    {/* Photo Placeholder */}
                    <div
                      className="w-16 h-20 rounded-sm mb-3 flex items-center justify-center"
                      style={{
                        border: `2px solid ${example.theme.colors.primary}`,
                        backgroundColor: example.theme.colors.backgroundAlt,
                      }}
                    >
                      <svg className="w-6 h-6" fill={example.theme.colors.primary} viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>

                    {/* Name */}
                    <div className="text-sm font-semibold mb-1" style={{ color: example.theme.colors.text }}>
                      {example.name}
                    </div>
                    <div className="text-xs mb-4" style={{ color: example.theme.colors.textMuted }}>
                      {example.nameHi}
                    </div>

                    {/* Details */}
                    <div className="w-full text-left space-y-2">
                      <div
                        className="text-xs font-semibold pb-1 border-b"
                        style={{ color: example.theme.colors.headerText, borderColor: example.theme.colors.primary }}
                      >
                        Personal Details
                      </div>
                      {Object.entries(example.preview).map(([key, value]) => (
                        <div key={key} className="flex text-[10px]">
                          <span className="w-1/3 capitalize" style={{ color: example.theme.colors.textMuted }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span style={{ color: example.theme.colors.text }}>: {value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {example.theme.name} Theme
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        with {example.border.name} border
                      </p>
                    </div>
                    <Link
                      href={`/app?theme=${example.theme.id}&border=${example.border.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-transform"
                    >
                      Use This
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-800/50' : 'bg-amber-50'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Your Own Biodata
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Start with any example above or create from scratch. Its completely free!
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
