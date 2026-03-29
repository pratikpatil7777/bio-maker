'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

interface PremiumRevealProps {
  onRevealComplete: () => void;
  skipReveal?: boolean;
}

// Animated SVG Logo that draws itself - Ganesh-inspired Om symbol
function AnimatedLogo({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div className="relative w-24 h-24">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Main logo container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.8,
        }}
        onAnimationComplete={onComplete}
      >
        {/* Om symbol SVG - draws itself */}
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(212, 175, 55, 0.5))' }}
        >
          <defs>
            <linearGradient id="omGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>

          {/* Om symbol path - simplified artistic version */}
          <motion.path
            d="M50 15 C30 15 20 30 20 45 C20 60 35 70 50 70 C65 70 75 60 75 50 C75 40 65 35 55 40 C45 45 45 55 55 60"
            fill="none"
            stroke="url(#omGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Decorative dot */}
          <motion.circle
            cx="55"
            cy="25"
            r="5"
            fill="url(#omGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3, type: "spring" }}
          />

          {/* Crescent moon */}
          <motion.path
            d="M45 20 Q55 15 65 20"
            fill="none"
            stroke="url(#omGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          />
        </svg>
      </motion.div>

      {/* Particle burst */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
            left: '50%',
            top: '50%',
          }}
          initial={{ x: '-50%', y: '-50%', scale: 0 }}
          animate={{
            x: `calc(-50% + ${Math.cos((i * Math.PI * 2) / 8) * 60}px)`,
            y: `calc(-50% + ${Math.sin((i * Math.PI * 2) / 8) * 60}px)`,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// Witty loading messages - Slack-style
const loadingMessages = [
  { en: "Arranging auspicious colors...", hi: "शुभ रंग सजा रहे हैं...", mr: "शुभ रंग सजवत आहोत..." },
  { en: "Adding traditional touches...", hi: "पारंपरिक स्पर्श जोड़ रहे हैं...", mr: "पारंपारिक स्पर्श जोडत आहोत..." },
  { en: "Preparing your canvas...", hi: "आपका कैनवास तैयार कर रहे हैं...", mr: "तुमचे कॅनव्हास तयार करत आहोत..." },
  { en: "Almost there...", hi: "बस एक पल...", mr: "जवळजवळ तयार..." },
];

// Counter animation component
function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration, count, rounded]);

  return <span>{displayValue}</span>;
}

export default function PremiumReveal({ onRevealComplete, skipReveal = false }: PremiumRevealProps) {
  const [phase, setPhase] = useState<'logo' | 'message' | 'reveal' | 'done'>(skipReveal ? 'done' : 'logo');
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bio-maker-language') as 'en' | 'hi' | 'mr' | null;
      if (stored) setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (skipReveal) {
      onRevealComplete();
      return;
    }

    // Phase transitions with shorter durations
    const timers: NodeJS.Timeout[] = [];

    // Logo phase: 800ms
    timers.push(setTimeout(() => setPhase('message'), 800));

    // Message phase: cycle through messages quickly
    let msgIdx = 0;
    const messageInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setMessageIndex(msgIdx);
    }, 400);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 100));
    }, 50);

    // Reveal phase: start at 1200ms
    timers.push(setTimeout(() => {
      setPhase('reveal');
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      setProgress(100);
    }, 1200));

    // Done: complete at 1600ms (total animation time)
    timers.push(setTimeout(() => {
      setPhase('done');
      onRevealComplete();
    }, 1600));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [skipReveal, onRevealComplete]);

  if (phase === 'done') return null;

  const currentMessage = loadingMessages[messageIndex];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(135deg, #FFF9F0 0%, #FFEDD5 50%, #FDE68A 100%)',
        }}
      >
        {/* Subtle animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedLogo />
          </motion.div>

          {/* Brand name - appears after logo */}
          <motion.h1
            className="mt-4 text-2xl font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #800020 0%, #A52A2A 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            Bio Maker
          </motion.h1>

          {/* Loading message - witty and animated */}
          <motion.div
            className="mt-6 h-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                className="text-sm text-amber-700/80 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {language === 'hi' ? currentMessage.hi : language === 'mr' ? currentMessage.mr : currentMessage.en}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar - minimal and elegant */}
          <motion.div
            className="mt-4 w-48 h-1 rounded-full overflow-hidden bg-amber-200/50"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                backgroundSize: '200% 100%',
              }}
              initial={{ width: '0%' }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                width: { duration: 0.1 },
                backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.div>
        </div>

        {/* Curtain reveal effect */}
        {phase === 'reveal' && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0] to-[#FFEDD5]"
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#FFF9F0] to-[#FFEDD5]"
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </>
        )}

        {/* Golden accent lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #800020, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
