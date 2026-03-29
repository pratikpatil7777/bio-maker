'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/lib/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';
import { themes } from '@/lib/themes';
import { borderDesigns } from '@/lib/borders';
import { PRICING_TIERS } from '@/lib/monetization';

const features = [
  { name: 'Unlimited Biodatas', free: true },
  { name: `${themes.length} Premium Themes`, free: true },
  { name: `${borderDesigns.length} Traditional Borders`, free: true },
  { name: '3 Languages (EN, HI, MR)', free: true },
  { name: 'PDF Export', free: true },
  { name: 'Image Export', free: true },
  { name: 'Photo Upload', free: true },
  { name: 'WhatsApp Sharing', free: true },
  { name: 'Local Storage (100% Private)', free: true },
  { name: 'No Watermarks', free: true },
  { name: 'No Account Required', free: true },
  { name: 'Works Offline', free: true },
];

export default function PricingPage() {
  const { isDark } = useDarkMode();
  const [showComingSoon, setShowComingSoon] = useState(false);

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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xl">🎉</span>
            100% Free Forever
          </motion.div>

          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Simple Pricing
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Bio Maker is completely free. No hidden costs, no premium tiers, no subscriptions.
          </p>
        </motion.div>
      </section>

      {/* Pricing Card */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-lg mx-auto">
          <motion.div
            className={`rounded-3xl overflow-hidden ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white shadow-2xl'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center text-white">
              <div className="text-lg font-medium mb-2">Everything Included</div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold">₹0</span>
                <span className="text-xl opacity-80">/ forever</span>
              </div>
              <p className="mt-4 text-white/80">No credit card required</p>
            </div>

            {/* Features */}
            <div className="p-8">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={feature.name}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature.name}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/app"
                className="mt-8 w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Creating - Its Free!
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Premium Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
            } font-medium mb-4`}>
              <span>Coming Soon</span>
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Premium Features (Optional)
            </h2>
            <p className={`max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We&apos;re working on optional premium add-ons for power users. The core biodata creator will always remain free!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <motion.div
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border-2 border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {PRICING_TIERS.free.name}
                </div>
                <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {PRICING_TIERS.free.priceDisplay}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>forever</div>
              </div>
              <ul className="space-y-3 mb-6">
                {PRICING_TIERS.free.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{f.en}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className={`block w-full text-center py-3 rounded-xl font-semibold ${
                  isDark
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {PRICING_TIERS.free.cta.en}
              </Link>
            </motion.div>

            {/* Premium Tier (Coming Soon) */}
            <motion.div
              className={`rounded-2xl p-6 relative ${
                isDark
                  ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/50'
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                  {PRICING_TIERS.basic.badge?.en}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className={`text-sm font-medium mb-2 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                  {PRICING_TIERS.basic.name}
                </div>
                <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {PRICING_TIERS.basic.priceDisplay}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {PRICING_TIERS.basic.pricePeriod?.en}
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {PRICING_TIERS.basic.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{f.en}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowComingSoon(true)}
                className="block w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </motion.div>

            {/* Family Pack (Coming Soon) */}
            <motion.div
              className={`rounded-2xl p-6 relative ${
                isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border-2 border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  {PRICING_TIERS.premium.badge?.en}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {PRICING_TIERS.premium.name}
                </div>
                <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {PRICING_TIERS.premium.priceDisplay}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {PRICING_TIERS.premium.pricePeriod?.en}
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {PRICING_TIERS.premium.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{f.en}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowComingSoon(true)}
                className={`block w-full text-center py-3 rounded-xl font-semibold ${
                  isDark
                    ? 'bg-slate-700 text-gray-400'
                    : 'bg-gray-100 text-gray-400'
                } opacity-50 cursor-not-allowed`}
              >
                Coming Soon
              </button>
            </motion.div>
          </div>

          {/* Email Signup for Launch */}
          {showComingSoon && (
            <motion.div
              className={`mt-8 p-6 rounded-2xl text-center ${
                isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-amber-50 border border-amber-200'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className={`mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Interested in premium features?
              </p>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                We&apos;ll notify you when premium features launch. Meanwhile, enjoy Bio Maker for free!
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl"
              >
                Continue with Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className={`rounded-3xl p-8 md:p-10 ${
              isDark
                ? 'bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💝</span>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Why is Bio Maker Free?
              </h3>
            </div>

            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                Bio Maker is a <strong>passion project</strong> built with love for Indian families.
                We believe that creating a beautiful biodata for your special journey shouldn&apos;t
                depend on your budget.
              </p>
              <p>
                We don&apos;t show ads. We don&apos;t sell your data. We don&apos;t have hidden fees.
                Your biodata stays on your device - we never even see it.
              </p>
            </div>

            <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-amber-200'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Our Promise:</strong>{' '}
                Creating and downloading biodatas will always be free. In the future, we may introduce
                optional premium add-ons (like AI writing assistance or exclusive templates) for those
                who want extra features - but the core product will never cost a rupee.
              </p>
            </div>

            <div className={`mt-6 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>🙏</span>
              <p className="text-sm italic">— Built with love in India</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-800/30' : 'bg-amber-50/50'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Is Bio Maker really free?',
                a: 'Yes, 100% free! We believe everyone deserves access to beautiful biodata creation tools. There are no hidden charges, premium tiers, or subscriptions required to use Bio Maker.'
              },
              {
                q: 'What\'s the catch? How do you sustain this?',
                a: 'No catch! Bio Maker is a passion project. We keep costs low by storing everything on your device (no expensive servers needed). In the future, we may offer optional premium add-ons for power users, but the core biodata creation will always remain free.'
              },
              {
                q: 'Is my data safe and private?',
                a: 'Absolutely. All your data is stored locally in your browser - it never leaves your device. We have zero access to your personal information, photos, or biodata content. Your privacy is guaranteed by design, not just by policy.'
              },
              {
                q: 'Do I need to create an account?',
                a: 'No account needed! Just open the app and start creating. Your data is automatically saved in your browser. This also means we don\'t have your email or any personal information.'
              },
              {
                q: 'Can I use it on mobile?',
                a: 'Yes! Bio Maker is fully responsive and works great on phones, tablets, and desktops. You can even use it offline after your first visit.'
              },
              {
                q: 'Will you add paid features later?',
                a: 'We may add optional premium features in the future (like AI-powered bio writing or exclusive design templates). But here\'s our promise: the ability to create, customize, and download beautiful biodatas will always be 100% free.'
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
