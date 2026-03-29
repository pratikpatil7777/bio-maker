'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

interface PremiumRevealProps {
  onRevealComplete: () => void;
  skipReveal?: boolean;
}

// Krishna's Bansuri (Flute) - Self-drawing animated SVG
function AnimatedBansuri({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div className="relative w-40 h-32">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.3, opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Main Bansuri SVG */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onAnimationComplete={onComplete}
      >
        <svg
          viewBox="0 0 200 80"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(212, 175, 55, 0.6))' }}
        >
          <defs>
            {/* Golden gradient for flute body */}
            <linearGradient id="fluteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>

            {/* Shine effect */}
            <linearGradient id="fluteShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>

            {/* Peacock feather gradient */}
            <linearGradient id="peacockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E90FF" />
              <stop offset="30%" stopColor="#00CED1" />
              <stop offset="60%" stopColor="#32CD32" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>

            {/* Feather eye gradient */}
            <radialGradient id="featherEye" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000080" />
              <stop offset="40%" stopColor="#4169E1" />
              <stop offset="70%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#32CD32" />
            </radialGradient>
          </defs>

          {/* Flute body - main tube */}
          <motion.rect
            x="30"
            y="35"
            width="150"
            height="16"
            rx="8"
            fill="url(#fluteGradient)"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: 'left center' }}
          />

          {/* Flute shine overlay */}
          <motion.rect
            x="30"
            y="35"
            width="150"
            height="6"
            rx="3"
            fill="url(#fluteShine)"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ transformOrigin: 'left center' }}
          />

          {/* Flute holes */}
          {[55, 80, 105, 130, 150].map((x, i) => (
            <motion.ellipse
              key={i}
              cx={x}
              cy="43"
              rx="4"
              ry="3"
              fill="#5C4033"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.2, type: "spring" }}
            />
          ))}

          {/* Decorative bands */}
          {[45, 165].map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y="33"
              width="4"
              height="20"
              rx="2"
              fill="#8B4513"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              style={{ transformOrigin: 'center' }}
            />
          ))}

          {/* Mouthpiece end */}
          <motion.ellipse
            cx="30"
            cy="43"
            rx="6"
            ry="10"
            fill="url(#fluteGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3, type: "spring" }}
          />

          {/* Peacock feather - stem */}
          <motion.path
            d="M25 38 Q15 25 20 10"
            fill="none"
            stroke="#228B22"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
          />

          {/* Peacock feather - main plume */}
          <motion.path
            d="M20 10 Q5 5 8 18 Q10 25 20 22 Q30 20 28 10 Q25 2 20 10"
            fill="url(#peacockGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
            style={{ transformOrigin: '20px 15px' }}
          />

          {/* Peacock feather - eye */}
          <motion.ellipse
            cx="18"
            cy="14"
            rx="5"
            ry="4"
            fill="url(#featherEye)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3, type: "spring" }}
          />

          {/* Peacock feather - eye highlight */}
          <motion.circle
            cx="17"
            cy="13"
            r="1.5"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, duration: 0.2 }}
          />

          {/* Music notes floating */}
          {[
            { x: 175, y: 25, delay: 0.7 },
            { x: 185, y: 35, delay: 0.9 },
            { x: 190, y: 20, delay: 1.1 },
          ].map((note, i) => (
            <motion.g key={i}>
              <motion.path
                d={`M${note.x} ${note.y} v8 M${note.x} ${note.y} q5 -3 3 -6 q-2 -2 -3 1`}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [10, -10, -20] }}
                transition={{ delay: note.delay, duration: 1.2, ease: "easeOut" }}
              />
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFF)',
            left: `${20 + i * 15}%`,
            top: '50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            y: [0, -20, -30],
          }}
          transition={{
            duration: 1,
            delay: 0.5 + i * 0.1,
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
          {/* Bansuri animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedBansuri />
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
