'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { themes, Theme } from '@/lib/themes';
import { borderDesigns, BorderDesign } from '@/lib/borders';
import { useDarkMode } from '@/lib/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';
import BorderRenderer from '@/components/borders';

export default function TemplatesPage() {
  const { isDark } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<'themes' | 'borders'>('themes');
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);
  const [hoveredBorder, setHoveredBorder] = useState<BorderDesign | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
            Beautiful Templates
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose from our collection of professionally designed themes and traditional borders
          </p>

          {/* Category Tabs */}
          <div className={`inline-flex p-1 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
            {(['themes', 'borders'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat} ({cat === 'themes' ? themes.length : borderDesigns.length})
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Templates Grid */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {selectedCategory === 'themes' ? (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredTheme(theme)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  {/* Theme Preview */}
                  <div
                    className="aspect-[3/4] p-4 flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.background }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2" style={{ color: theme.colors.primary }}>ॐ</div>
                      <div className="text-xs font-semibold" style={{ color: theme.colors.headerText }}>
                        {theme.name}
                      </div>
                      <div className="mt-4 space-y-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex justify-center gap-2">
                            <div className="h-1 w-8 rounded" style={{ backgroundColor: theme.colors.primary + '40' }} />
                            <div className="h-1 w-12 rounded" style={{ backgroundColor: theme.colors.secondary + '40' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {theme.name}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {theme.nameHindi}
                    </p>
                    {/* Color Preview */}
                    <div className="flex gap-1 mt-2">
                      {theme.preview.map((color, i) => (
                        <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  {hoveredTheme?.id === theme.id && (
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Link
                        href={`/app?theme=${theme.id}`}
                        className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
                      >
                        Use This Theme
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {borderDesigns.map((border) => (
                <motion.div
                  key={border.id}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredBorder(border)}
                  onMouseLeave={() => setHoveredBorder(null)}
                >
                  {/* Border Preview */}
                  <div className="aspect-[3/4] relative bg-[#FFFEF8]">
                    <BorderRenderer
                      borderId={border.id}
                      primaryColor="#800020"
                      secondaryColor="#D4AF37"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-[#800020] text-sm font-medium">{border.name}</span>
                    </div>
                  </div>

                  {/* Border Info */}
                  <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {border.name}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {border.nameHindi}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  {hoveredBorder?.id === border.id && (
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Link
                        href={`/app?border=${border.id}`}
                        className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
                      >
                        Use This Border
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-800/50' : 'bg-amber-50'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Create Your Biodata?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Mix and match themes and borders to create your perfect biodata
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
