'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';
import BorderRenderer from './borders';
import DarkModeToggle from './DarkModeToggle';
import { useDarkMode } from '@/lib/DarkModeContext';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Dynamically import 3D background to avoid SSR issues
const Background3D = dynamic(() => import('./Background3D'), {
  ssr: false,
  loading: () => null,
});

interface EmptyStateProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  currentBorder: BorderDesign;
  onBorderChange: (border: BorderDesign) => void;
  onStartBuilding: () => void;
  onUseTemplate: () => void;
}

// Premium SVG Icons
const icons = {
  palette: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  frame: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  download: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  sparkles: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

// Film Grain Overlay Component
function FilmGrain({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: isDark ? 0.08 : 0.04,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// Animated Word Component for Premium Typography
function AnimatedWord({
  word,
  index,
  isDark,
  isHero = false
}: {
  word: string;
  index: number;
  isDark: boolean;
  isHero?: boolean;
}) {
  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      initial={{ opacity: 0, y: 80, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.5 + index * 0.12,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1], // Custom cubic-bezier like Prometheus
      }}
    >
      <motion.span
        className={`inline-block ${isHero ? 'hover:scale-105' : ''}`}
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(135deg, #F5DEB3 0%, #FFD700 25%, #DAA520 50%, #FFD700 75%, #F5DEB3 100%)'
            : 'linear-gradient(135deg, #800020 0%, #A52A2A 25%, #800020 50%, #C41E3A 75%, #800020 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        whileHover={isHero ? { scale: 1.05 } : undefined}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}

// Parallax Decorative Element
function ParallaxElement({
  children,
  speed = 0.5,
  className = ''
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Journey Progress Indicator (Decorative Thread)
function JourneyThread({ isDark }: { isDark: boolean }) {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed left-8 top-0 bottom-0 w-px hidden xl:block z-20 pointer-events-none">
      <svg className="h-full w-8" viewBox="0 0 32 1000" preserveAspectRatio="none">
        <motion.path
          d="M16 0 Q24 100 16 200 Q8 300 16 400 Q24 500 16 600 Q8 700 16 800 Q24 900 16 1000"
          fill="none"
          stroke={isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(128, 0, 32, 0.2)'}
          strokeWidth="2"
          strokeDasharray="8 4"
        />
        <motion.path
          d="M16 0 Q24 100 16 200 Q8 300 16 400 Q24 500 16 600 Q8 700 16 800 Q24 900 16 1000"
          fill="none"
          stroke={isDark ? '#D4AF37' : '#800020'}
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>
      {/* Journey Markers */}
      {[0, 0.25, 0.5, 0.75, 1].map((position, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            top: `${position * 100}%`,
            background: isDark
              ? 'radial-gradient(circle, #FFD700, #D4AF37)'
              : 'radial-gradient(circle, #A52A2A, #800020)',
            boxShadow: isDark
              ? '0 0 10px rgba(212, 175, 55, 0.5)'
              : '0 0 10px rgba(128, 0, 32, 0.3)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.2 }}
        />
      ))}
    </div>
  );
}

// Decorative Mandala for Parallax
function FloatingMandala({ isDark, size = 200, position }: { isDark: boolean; size?: number; position: 'left' | 'right' }) {
  return (
    <ParallaxElement speed={0.3} className={`absolute ${position === 'left' ? '-left-20' : '-right-20'} pointer-events-none`}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="opacity-10">
        <defs>
          <linearGradient id={`mandala-gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#D4AF37' : '#800020'} />
            <stop offset="100%" stopColor={isDark ? '#FFD700' : '#A52A2A'} />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 50 50)`}>
            <path
              d="M50 10 Q60 30 50 50 Q40 30 50 10"
              fill="none"
              stroke={`url(#mandala-gradient-${position})`}
              strokeWidth="0.5"
            />
            <circle cx="50" cy="15" r="3" fill={`url(#mandala-gradient-${position})`} />
          </g>
        ))}
        <circle cx="50" cy="50" r="8" fill="none" stroke={`url(#mandala-gradient-${position})`} strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" fill="none" stroke={`url(#mandala-gradient-${position})`} strokeWidth="0.3" />
      </svg>
    </ParallaxElement>
  );
}

export default function EmptyState({
  language,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  currentBorder,
  onBorderChange,
  onStartBuilding,
  onUseTemplate,
}: EmptyStateProps) {
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';
  const { isDark } = useDarkMode();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Dynamic preview state
  const [previewThemeIndex, setPreviewThemeIndex] = useState(0);
  const [previewBorderIndex, setPreviewBorderIndex] = useState(0);

  // Scroll-based animations
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });
  const journeyInView = useInView(journeyRef, { once: true, margin: '-100px' });

  // Parallax scroll values
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Auto-rotate preview
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewThemeIndex((prev) => {
        const nextTheme = (prev + 1) % themes.length;
        if (nextTheme === 0) {
          setPreviewBorderIndex((prevBorder) => (prevBorder + 1) % borderDesigns.length);
        }
        return nextTheme;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentPreviewTheme = themes[previewThemeIndex];
  const currentPreviewBorder = borderDesigns[previewBorderIndex];

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  // Split hero text into words for animation
  const heroLine1 = getText('Create Beautiful', 'सुंदर विवाह', 'सुंदर विवाह');
  const heroLine2 = getText('Marriage Biodatas', 'बायोडाटा बनाएं', 'बायोडाटा तयार करा');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }
    }
  };

  // Glow effect animation
  const glowAnimation = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(251, 191, 36, 0.3)',
        '0 0 60px rgba(251, 191, 36, 0.5)',
        '0 0 20px rgba(251, 191, 36, 0.3)'
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
    }
  };


  return (
    <main className="min-h-screen transition-colors duration-500 relative overflow-hidden">
      {/* Film Grain Overlay - Premium texture */}
      <FilmGrain isDark={isDark} />

      {/* Journey Thread - Scroll Progress */}
      <JourneyThread isDark={isDark} />

      {/* Base gradient background - bottommost layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #0a0a15 0%, #0f172a 30%, #1a1a2e 50%, #0f172a 70%, #0a0a15 100%)'
            : 'linear-gradient(180deg, #FFFEF8 0%, #FFF9E8 25%, #FFEDD5 50%, #FFF9E8 75%, #FFFEF8 100%)',
          zIndex: -5,
        }}
      />

      {/* Vintage Paper Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'none'
            : `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23FFFEF8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          zIndex: -4,
          mixBlendMode: 'multiply',
        }}
      />

      {/* 3D Background - above base gradient, below content */}
      <Suspense fallback={null}>
        <Background3D isDark={isDark} />
      </Suspense>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <motion.nav
          className="py-4 px-6 sticky top-0 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`max-w-6xl mx-auto flex justify-between items-center px-4 py-2 rounded-2xl backdrop-blur-md ${
              isDark ? 'bg-slate-900/70' : 'bg-white/70'
            } shadow-lg border ${isDark ? 'border-slate-700/50' : 'border-amber-200/50'}`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={44}
                  height={44}
                  className="rounded-lg"
                  style={{
                    filter: isDark
                      ? 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.3))'
                      : 'drop-shadow(0 4px 12px rgba(128, 0, 32, 0.2))',
                  }}
                  priority
                />
              </motion.div>
              <span
                className={`hidden sm:block text-lg font-bold ${isDark ? 'text-amber-100' : 'text-[#800020]'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {getText('Bio Maker', 'Bio Maker', 'Bio Maker')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-0.5 p-1 rounded-full ${isDark ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-md border ${isDark ? 'border-slate-700' : 'border-amber-200/50'}`}>
                {['en', 'hi', 'mr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang as Language)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-gray-600 hover:text-amber-700'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'मरा'}
                  </button>
                ))}
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </motion.nav>

        {/* Hero Section - Cinematic Typography */}
        <motion.section
          ref={heroRef}
          className="min-h-[80vh] flex items-center py-6 md:py-12 px-6 relative"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Floating Mandalas for Parallax Effect */}
          <FloatingMandala isDark={isDark} size={300} position="left" />
          <FloatingMandala isDark={isDark} size={250} position="right" />

          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Premium Typography Content */}
              <motion.div
                className="text-center lg:text-left order-2 lg:order-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Large Hero Typography - Word by Word Animation */}
                <h1
                  className="mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {/* First Line */}
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.15] mb-1">
                    {heroLine1.split(' ').map((word, i) => (
                      <AnimatedWord key={i} word={word} index={i} isDark={isDark} isHero />
                    ))}
                  </div>
                  {/* Second Line - Slightly Larger for Impact */}
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.15]">
                    {heroLine2.split(' ').map((word, i) => (
                      <AnimatedWord key={i} word={word} index={i + heroLine1.split(' ').length} isDark={isDark} isHero />
                    ))}
                  </div>
                </h1>

                {/* Elegant Divider */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-4 mb-6"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className={`h-px w-16 ${isDark ? 'bg-gradient-to-r from-transparent to-amber-500' : 'bg-gradient-to-r from-transparent to-[#800020]'}`} />
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isDark ? 'bg-amber-500' : 'bg-[#800020]'}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className={`h-px w-16 ${isDark ? 'bg-gradient-to-l from-transparent to-amber-500' : 'bg-gradient-to-l from-transparent to-[#800020]'}`} />
                </motion.div>

                {/* Subtitle with Stagger */}
                <motion.p
                  className={`text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {getText(
                    'Professional, print-ready biodatas crafted with elegance. Beautiful themes, multiple languages, and traditional borders.',
                    'सुंदरता से तैयार प्रोफेशनल बायोडाटा। सुंदर थीम, कई भाषाएं और पारंपरिक बॉर्डर।',
                    'सुंदरतेने तयार केलेले प्रोफेशनल बायोडाटा. सुंदर थीम, अनेक भाषा आणि पारंपारिक बॉर्डर.'
                  )}
                </motion.p>

                {/* Trust badges */}
                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  {[
                    { icon: '🔒', text: getText('100% Private', '100% निजी', '100% खाजगी') },
                    { icon: '🌐', text: getText('3 Languages', '3 भाषाएं', '3 भाषा') },
                    { icon: '📄', text: getText('PDF & Image', 'PDF और इमेज', 'PDF आणि इमेज') },
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                        isDark ? 'bg-slate-800/60 text-gray-300 border border-slate-700/50' : 'bg-white/80 text-gray-700 border border-amber-200/50'
                      } shadow-sm backdrop-blur-sm`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <span className="text-lg">{badge.icon}</span>
                      <span className="font-medium">{badge.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <motion.button
                    onClick={onStartBuilding}
                    className="w-full sm:w-auto group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl transition-all cursor-pointer overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    {...glowAnimation}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      >
                        ✨
                      </motion.span>
                      {getText('Begin Your Journey', 'अपनी यात्रा शुरू करें', 'तुमचा प्रवास सुरू करा')}
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      onThemeChange(currentPreviewTheme);
                      onBorderChange(currentPreviewBorder);
                      onUseTemplate();
                    }}
                    className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-sm ${
                      isDark
                        ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10 bg-slate-900/50'
                        : 'border-[#800020]/50 text-[#800020] hover:bg-[#800020]/5 bg-white/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {getText('Use This Template', 'यह टेम्पलेट उपयोग करें', 'हा टेम्पलेट वापरा')}
                  </motion.button>
                </motion.div>

                {/* Privacy note */}
                <motion.button
                  onClick={() => setShowPrivacyModal(true)}
                  className={`mt-6 inline-flex items-center gap-2 text-sm cursor-pointer hover:underline ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {getText('Your data stays private - learn how', 'आपका डेटा सुरक्षित रहता है', 'तुमचा डेटा खाजगी राहतो')}
                </motion.button>
              </motion.div>

              {/* Right: Dynamic Live Preview */}
              <motion.div
                className="order-1 lg:order-2 flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <ParallaxElement speed={-0.2}>
                  <motion.div
                    className="relative"
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Decorative glow */}
                    <motion.div
                      className="absolute -inset-8 rounded-3xl blur-3xl opacity-30"
                      style={{ background: currentPreviewTheme.colors.primary }}
                      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Main preview card */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentPreviewTheme.id}-${currentPreviewBorder.id}`}
                        className="relative rounded-2xl shadow-2xl overflow-hidden"
                        style={{
                          width: '300px',
                          height: '400px',
                          backgroundColor: currentPreviewTheme.colors.background,
                        }}
                        initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <BorderRenderer
                          borderId={currentPreviewBorder.id}
                          primaryColor={currentPreviewTheme.colors.primary}
                          secondaryColor={currentPreviewTheme.colors.secondary}
                        />
                        <div className="absolute inset-0 z-10 p-6 flex flex-col items-center">
                          <div className="text-3xl mb-2" style={{ color: currentPreviewTheme.colors.primary }}>ॐ</div>
                          <div className="text-xs font-medium mb-3" style={{ color: currentPreviewTheme.colors.secondary }}>
                            || श्री गणेशाय नमः ||
                          </div>
                          <div className="text-sm font-bold mb-3" style={{ color: currentPreviewTheme.colors.headerText }}>
                            {getText('MARRIAGE BIODATA', 'विवाह बायोडाटा', 'विवाह बायोडाटा')}
                          </div>
                          <div
                            className="w-16 h-20 rounded-sm mb-3 flex items-center justify-center"
                            style={{
                              border: `2px solid ${currentPreviewTheme.colors.primary}`,
                              backgroundColor: currentPreviewTheme.colors.backgroundAlt,
                            }}
                          >
                            <svg className="w-6 h-6" fill={currentPreviewTheme.colors.primary} viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div className="text-sm font-semibold mb-4" style={{ color: currentPreviewTheme.colors.text }}>
                            {getText('Your Name Here', 'आपका नाम यहां', 'तुमचे नाव येथे')}
                          </div>
                          <div className="w-full">
                            <div
                              className="text-xs font-semibold pb-1 mb-2 border-b"
                              style={{ color: currentPreviewTheme.colors.headerText, borderColor: currentPreviewTheme.colors.primary }}
                            >
                              {getText('Personal Details', 'व्यक्तिगत विवरण', 'वैयक्तिक तपशील')}
                            </div>
                            <div className="space-y-1.5 text-[10px]">
                              {[
                                getText('Date of Birth', 'जन्म तिथि', 'जन्म तारीख'),
                                getText('Height', 'ऊंचाई', 'उंची'),
                                getText('Education', 'शिक्षा', 'शिक्षण'),
                              ].map((field, i) => (
                                <div key={i} className="flex">
                                  <span className="w-1/2" style={{ color: currentPreviewTheme.colors.textMuted }}>{field}</span>
                                  <span className="w-1/2" style={{ color: currentPreviewTheme.colors.text }}>: ................</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Theme/Border indicator */}
                    <motion.div
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 ${isDark ? 'bg-slate-800 text-gray-200' : 'bg-white text-gray-700'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${currentPreviewTheme.preview[0]}, ${currentPreviewTheme.preview[1]})` }}
                      />
                      <span>
                        {isHindi ? currentPreviewTheme.nameHindi : isMarathi ? currentPreviewTheme.nameMarathi : currentPreviewTheme.name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {isHindi ? currentPreviewBorder.nameHindi : isMarathi ? currentPreviewBorder.nameMarathi : currentPreviewBorder.name}
                      </span>
                    </motion.div>

                    {/* Preview cycle indicators */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {themes.map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 rounded-full"
                          style={{
                            width: i === previewThemeIndex ? 16 : 6,
                            backgroundColor: i === previewThemeIndex
                              ? '#f59e0b'
                              : isDark ? '#334155' : '#d1d5db'
                          }}
                          animate={{ width: i === previewThemeIndex ? 16 : 6 }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </ParallaxElement>
              </motion.div>
            </div>

          </div>
        </motion.section>

        {/* Why Choose Us Section - Ethical Social Proof */}
        <motion.section
          ref={journeyRef}
          className="py-16 px-6 relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={journeyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {getText(
                  'Why Families Choose Us',
                  'परिवार हमें क्यों चुनते हैं',
                  'कुटुंबे आम्हाला का निवडतात'
                )}
              </h2>
              <p className={`text-base max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {getText(
                  'Built with love for Indian families. Designed to honor traditions while embracing modern convenience.',
                  'भारतीय परिवारों के लिए प्यार से बनाया गया। परंपराओं का सम्मान करते हुए आधुनिक सुविधा।',
                  'भारतीय कुटुंबांसाठी प्रेमाने बनवले. परंपरांचा सन्मान करताना आधुनिक सोय.'
                )}
              </p>
            </motion.div>

            {/* Trust Indicators Grid - Real Features, Not Fake Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={journeyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                {
                  icon: '🔒',
                  value: '100%',
                  label: getText('Private & Secure', 'निजी और सुरक्षित', 'खाजगी आणि सुरक्षित'),
                  sublabel: getText('Data stays on your device', 'डेटा आपके डिवाइस पर रहता है', 'डेटा तुमच्या डिव्हाइसवर राहतो')
                },
                {
                  icon: '🎨',
                  value: `${themes.length}+`,
                  label: getText('Premium Themes', 'प्रीमियम थीम', 'प्रीमियम थीम'),
                  sublabel: getText('Traditional & modern styles', 'पारंपरिक और आधुनिक', 'पारंपारिक आणि आधुनिक')
                },
                {
                  icon: '🆓',
                  value: '₹0',
                  label: getText('Forever Free', 'हमेशा मुफ्त', 'कायम मोफत'),
                  sublabel: getText('No hidden charges', 'कोई छुपे शुल्क नहीं', 'कोणतेही छुपे शुल्क नाही')
                },
                {
                  icon: '🌐',
                  value: '3',
                  label: getText('Languages', 'भाषाएं', 'भाषा'),
                  sublabel: getText('English, Hindi, Marathi', 'अंग्रेजी, हिंदी, मराठी', 'इंग्रजी, हिंदी, मराठी')
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`relative p-6 rounded-2xl text-center ${
                    isDark
                      ? 'bg-slate-800/40 border border-slate-700/50'
                      : 'bg-white/60 border border-amber-100/50 shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={journeyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-amber-400' : 'text-[#800020]'}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={journeyInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: '🇮🇳', text: getText('Made for India', 'भारत के लिए बना', 'भारतासाठी बनवले') },
                { icon: '📱', text: getText('Works Offline', 'ऑफलाइन काम करता है', 'ऑफलाइन काम करते') },
                { icon: '🖨️', text: getText('Print Ready PDF', 'प्रिंट रेडी PDF', 'प्रिंट रेडी PDF') },
                { icon: '⚡', text: getText('Instant Download', 'तुरंत डाउनलोड', 'तात्काळ डाउनलोड') },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                    isDark
                      ? 'bg-slate-800/60 text-gray-300 border border-slate-700/50'
                      : 'bg-white/80 text-gray-700 border border-amber-200/50 shadow-sm'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={journeyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          ref={featuresRef}
          className="py-12 px-6 relative"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
                  isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-700'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                {icons.sparkles}
                <span>{getText('Features', 'विशेषताएं', 'वैशिष्ट्ये')}</span>
              </motion.div>
              <h2
                className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {getText('Everything You Need', 'वह सब कुछ जो आपको चाहिए', 'तुम्हाला हवे असलेले सर्वकाही')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {getText(
                  'Create professional marriage biodatas with our easy-to-use builder',
                  'हमारे आसान बिल्डर से प्रोफेशनल बायोडाटा बनाएं',
                  'आमच्या सोप्या बिल्डरने प्रोफेशनल बायोडाटा बनवा'
                )}
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? 'visible' : 'hidden'}
            >
              {[
                {
                  icon: icons.palette,
                  title: getText('Beautiful Themes', 'सुंदर थीम', 'सुंदर थीम'),
                  desc: getText(
                    `${themes.length} elegant color themes`,
                    `${themes.length} खूबसूरत कलर थीम`,
                    `${themes.length} सुंदर कलर थीम`
                  ),
                  gradient: 'from-violet-500 to-purple-600',
                  glow: 'rgba(139, 92, 246, 0.4)',
                },
                {
                  icon: icons.frame,
                  title: getText('Decorative Borders', 'सजावटी बॉर्डर', 'सजावटीच्या बॉर्डर'),
                  desc: getText(
                    `${borderDesigns.length} traditional designs`,
                    `${borderDesigns.length} पारंपरिक डिजाइन`,
                    `${borderDesigns.length} पारंपारिक डिझाइन`
                  ),
                  gradient: 'from-rose-500 to-pink-600',
                  glow: 'rgba(244, 63, 94, 0.4)',
                },
                {
                  icon: icons.globe,
                  title: getText('Multi-language', 'बहुभाषी', 'बहुभाषिक'),
                  desc: getText(
                    'English, Hindi & Marathi',
                    'इंग्लिश, हिंदी और मराठी',
                    'इंग्रजी, हिंदी आणि मराठी'
                  ),
                  gradient: 'from-blue-500 to-cyan-600',
                  glow: 'rgba(59, 130, 246, 0.4)',
                },
                {
                  icon: icons.download,
                  title: getText('Easy Export', 'आसान एक्सपोर्ट', 'सोपा एक्सपोर्ट'),
                  desc: getText(
                    'PDF or high-quality images',
                    'PDF या HD इमेज',
                    'PDF किंवा HD इमेज'
                  ),
                  gradient: 'from-amber-500 to-orange-600',
                  glow: 'rgba(245, 158, 11, 0.4)',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className={`group relative p-8 rounded-3xl transition-all duration-300 overflow-hidden ${
                    isDark
                      ? 'bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50'
                      : 'bg-white/80 backdrop-blur-sm hover:shadow-2xl border border-white/50'
                  }`}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    boxShadow: `0 25px 50px -12px ${feature.glow}`,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: '2px', borderRadius: '1.5rem' }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className={`w-full h-full rounded-3xl ${isDark ? 'bg-slate-800' : 'bg-white'}`} />
                  </motion.div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${feature.gradient}`}
                        initial={{ y: '100%', x: `${20 + j * 15}%`, opacity: 0 }}
                        animate={{
                          y: ['100%', '-10%'],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: j * 0.3,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: 'spring' as const, stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section - Modern Timeline */}
        <motion.section
          ref={stepsRef}
          className="py-16 px-6 relative"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                  isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={stepsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                {getText('Simple Process', 'सरल प्रक्रिया', 'सोपी प्रक्रिया')}
              </motion.span>
              <h2
                className={`text-3xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {getText('Create in Minutes', 'मिनटों में बनाएं', 'मिनिटांत तयार करा')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {getText(
                  'No design skills needed. Just follow three simple steps.',
                  'कोई डिजाइन कौशल की जरूरत नहीं। बस तीन आसान कदम।',
                  'कोणत्याही डिझाइन कौशल्याची गरज नाही. फक्त तीन सोप्या पायऱ्या.'
                )}
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-0 relative"
              variants={containerVariants}
              initial="hidden"
              animate={stepsInView ? 'visible' : 'hidden'}
            >
              {/* Animated connecting line for desktop */}
              <motion.div
                className={`absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] hidden md:block ${isDark ? 'bg-gradient-to-r from-amber-500/50 via-amber-500 to-amber-500/50' : 'bg-gradient-to-r from-amber-300/50 via-amber-400 to-amber-300/50'}`}
                initial={{ scaleX: 0 }}
                animate={stepsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {[
                {
                  num: '1',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                  ),
                  title: getText('Pick Your Style', 'अपनी स्टाइल चुनें', 'तुमची स्टाइल निवडा'),
                  desc: getText('Choose from beautiful themes and elegant traditional borders', 'सुंदर थीम और बॉर्डर चुनें', 'सुंदर थीम आणि बॉर्डर निवडा'),
                  gradient: 'from-violet-500 to-purple-600',
                },
                {
                  num: '2',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  ),
                  title: getText('Add Your Details', 'अपनी जानकारी डालें', 'तुमची माहिती टाका'),
                  desc: getText('Fill in personal, family, education and career information', 'व्यक्तिगत और पारिवारिक जानकारी भरें', 'वैयक्तिक आणि कौटुंबिक माहिती भरा'),
                  gradient: 'from-amber-500 to-orange-600',
                },
                {
                  num: '3',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  ),
                  title: getText('Download & Share', 'डाउनलोड और शेयर करें', 'डाउनलोड आणि शेअर करा'),
                  desc: getText('Export as print-ready PDF or share directly via WhatsApp', 'PDF डाउनलोड करें या WhatsApp से शेयर करें', 'PDF डाउनलोड करा किंवा WhatsApp वर शेअर करा'),
                  gradient: 'from-emerald-500 to-teal-600',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative px-6 py-8 text-center group"
                  variants={itemVariants}
                >
                  {/* Step number circle */}
                  <motion.div
                    className="relative mx-auto mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring' as const, stiffness: 400 }}
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                      style={{ width: 120, height: 120, margin: 'auto', left: 0, right: 0, top: 0 }}
                    />

                    {/* Main circle */}
                    <div
                      className={`relative w-[120px] h-[120px] mx-auto rounded-full flex items-center justify-center ${
                        isDark
                          ? 'bg-slate-800 border-2 border-slate-700'
                          : 'bg-white border-2 border-gray-100 shadow-xl'
                      }`}
                    >
                      {/* Gradient ring */}
                      <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${item.gradient} opacity-10`} />

                      {/* Icon */}
                      <div className={`relative z-10 bg-gradient-to-br ${item.gradient} text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                        {item.icon}
                      </div>

                      {/* Step number badge */}
                      <div className={`absolute -top-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {item.num}
                      </div>
                    </div>
                  </motion.div>

                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA after steps */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={onStartBuilding}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {getText('Start Creating Now', 'अभी शुरू करें', 'आता सुरू करा')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Free Section - Transparency & Trust */}
        <motion.section
          className="py-16 px-6 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              className={`relative rounded-3xl p-8 md:p-12 overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-200/50'
              }`}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill={isDark ? '#D4AF37' : '#800020'}>
                  <path d="M50 5 L55 35 L85 40 L60 55 L65 85 L50 65 L35 85 L40 55 L15 40 L45 35 Z" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDark ? 'bg-amber-500/20' : 'bg-amber-100'
                  }`}>
                    <span className="text-2xl">💝</span>
                  </div>
                  <div>
                    <h3
                      className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {getText('Why is Bio Maker Free?', 'Bio Maker मुफ्त क्यों है?', 'Bio Maker मोफत का आहे?')}
                    </h3>
                  </div>
                </div>

                {/* Story */}
                <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p>
                    {getText(
                      'Bio Maker is a passion project, built with love for Indian families. We believe everyone deserves a beautiful biodata for their special journey - regardless of budget.',
                      'Bio Maker एक पैशन प्रोजेक्ट है, जो भारतीय परिवारों के लिए प्यार से बनाया गया है। हम मानते हैं कि हर किसी को अपनी विशेष यात्रा के लिए एक सुंदर बायोडाटा मिलना चाहिए।',
                      'Bio Maker हा एक पॅशन प्रोजेक्ट आहे, भारतीय कुटुंबांसाठी प्रेमाने बनवलेला. आम्हाला विश्वास आहे की प्रत्येकाला त्यांच्या विशेष प्रवासासाठी सुंदर बायोडाटा मिळायला हवा.'
                    )}
                  </p>
                </div>

                {/* Promise badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { icon: '🚫', text: getText('No Ads', 'कोई विज्ञापन नहीं', 'जाहिराती नाहीत') },
                    { icon: '🔒', text: getText('No Data Selling', 'डेटा नहीं बेचते', 'डेटा विकत नाही') },
                    { icon: '💳', text: getText('No Hidden Fees', 'कोई छुपे शुल्क नहीं', 'छुपे शुल्क नाहीत') },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                        isDark
                          ? 'bg-slate-700/50 text-gray-300'
                          : 'bg-white/80 text-gray-700 shadow-sm'
                      }`}
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* Future note */}
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-amber-200/50'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText('Our Promise:', 'हमारा वादा:', 'आमचे वचन:')}
                    </span>{' '}
                    {getText(
                      'The core features will always remain free. In the future, we may add optional premium features (like AI writing assistance) - but creating and downloading biodatas will never cost a rupee.',
                      'मुख्य सुविधाएं हमेशा मुफ्त रहेंगी। भविष्य में, हम वैकल्पिक प्रीमियम सुविधाएं जोड़ सकते हैं (जैसे AI लेखन सहायता) - लेकिन बायोडाटा बनाना और डाउनलोड करना कभी भी एक रुपया नहीं लगेगा।',
                      'मुख्य वैशिष्ट्ये नेहमी मोफत राहतील. भविष्यात, आम्ही पर्यायी प्रीमियम वैशिष्ट्ये जोडू शकतो (जसे AI लेखन सहाय्य) - पण बायोडाटा बनवणे आणि डाउनलोड करणे कधीही एक रुपयाही लागणार नाही.'
                    )}
                  </p>
                </div>

                {/* Creator signature */}
                <div className={`mt-6 flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-2xl">🙏</div>
                  <p className="text-sm italic">
                    {getText(
                      '— Built with love in India',
                      '— भारत में प्यार से बनाया',
                      '— भारतात प्रेमाने बनवले'
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-12 px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-slate-800/60' : 'bg-white/80'} shadow-sm backdrop-blur-sm`}>
                <span className="text-green-500">●</span>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getText('100% Free • No Signup Required', '100% मुफ्त • साइनअप की जरूरत नहीं', '100% मोफत • साइनअपची गरज नाही')}
                </span>
              </div>
            </motion.div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {getText(
                'Your data stays on your device. We never see or store your information.',
                'आपका डेटा आपके डिवाइस पर रहता है।',
                'तुमचा डेटा तुमच्या डिव्हाइसवर राहतो.'
              )}
            </p>
            {/* Decorative footer line */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className={`h-px w-16 ${isDark ? 'bg-amber-500/30' : 'bg-[#800020]/30'}`} />
              <span className={`text-lg ${isDark ? 'text-amber-500/50' : 'text-[#800020]/50'}`}>❦</span>
              <div className={`h-px w-16 ${isDark ? 'bg-amber-500/30' : 'bg-[#800020]/30'}`} />
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative max-w-md w-full rounded-3xl shadow-2xl p-8 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <button
                onClick={() => setShowPrivacyModal(false)}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {getText('Your Privacy is Protected', 'आपकी गोपनीयता सुरक्षित है', 'तुमची गोपनीयता संरक्षित आहे')}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {getText('We take your privacy seriously', 'हम गोपनीयता को गंभीरता से लेते हैं', 'आम्ही गोपनीयतेला गांभीर्याने घेतो')}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { icon: '💾', text: getText('All data stored locally in your browser', 'सारा डेटा ब्राउज़र में स्टोर', 'सर्व डेटा ब्राउझरमध्ये स्टोअर') },
                  { icon: '🚫', text: getText('No account or signup required', 'कोई साइनअप जरूरी नहीं', 'कोणताही साइनअप आवश्यक नाही') },
                  { icon: '📱', text: getText('PDF exports created on your device', 'PDF डिवाइस पर बनते हैं', 'PDF डिव्हाइसवर बनतात') },
                  { icon: '🔐', text: getText('We never see or store your data', 'हम डेटा कभी नहीं देखते', 'आम्ही डेटा कधीही पाहत नाही') },
                  { icon: '🌐', text: getText('Works offline after first load', 'पहली बार के बाद ऑफलाइन', 'पहिल्यांदा नंतर ऑफलाइन') },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className={`flex items-center gap-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-2xl cursor-pointer transition-all text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getText('Got it!', 'समझ गया!', 'समजले!')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
