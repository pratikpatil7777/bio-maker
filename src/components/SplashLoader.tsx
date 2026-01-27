'use client';

import React, { useState, useEffect } from 'react';

interface SplashLoaderProps {
  onLoadingComplete: () => void;
  minDuration?: number; // Minimum display time in ms
}

// Fixed particle positions (pre-calculated to avoid hydration mismatch)
const particles = [
  { left: 5, top: 10, duration: 4, delay: 0 },
  { left: 15, top: 25, duration: 5, delay: 0.5 },
  { left: 25, top: 80, duration: 6, delay: 1 },
  { left: 35, top: 45, duration: 4.5, delay: 0.3 },
  { left: 45, top: 15, duration: 5.5, delay: 0.8 },
  { left: 55, top: 70, duration: 4, delay: 1.2 },
  { left: 65, top: 35, duration: 6, delay: 0.2 },
  { left: 75, top: 90, duration: 5, delay: 0.7 },
  { left: 85, top: 55, duration: 4.5, delay: 1.5 },
  { left: 95, top: 20, duration: 5.5, delay: 0.4 },
  { left: 10, top: 60, duration: 4, delay: 1.1 },
  { left: 20, top: 40, duration: 6, delay: 0.6 },
  { left: 30, top: 85, duration: 5, delay: 1.3 },
  { left: 40, top: 5, duration: 4.5, delay: 0.9 },
  { left: 50, top: 50, duration: 5.5, delay: 0.1 },
  { left: 60, top: 75, duration: 4, delay: 1.4 },
  { left: 70, top: 30, duration: 6, delay: 0.35 },
  { left: 80, top: 65, duration: 5, delay: 1.0 },
  { left: 90, top: 12, duration: 4.5, delay: 0.55 },
  { left: 3, top: 95, duration: 5.5, delay: 1.25 },
];

// Marriage/Love themed icons as SVG components
const icons = [
  // Heart
  {
    id: 'heart',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    color: '#E91E63',
  },
  // Rings
  {
    id: 'rings',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <circle cx="9" cy="12" r="5"/>
        <circle cx="15" cy="12" r="5"/>
      </svg>
    ),
    color: '#FFD700',
  },
  // Couple
  {
    id: 'couple',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    color: '#9C27B0',
  },
  // Document/Biodata
  {
    id: 'biodata',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
    color: '#2196F3',
  },
  // Flower/Lotus
  {
    id: 'flower',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 4.12 13.38 3 12 3S9.5 4.12 9.5 5.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
      </svg>
    ),
    color: '#E91E63',
  },
  // Star/Match
  {
    id: 'star',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    color: '#FFC107',
  },
  // Temple/Mandap
  {
    id: 'mandap',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 7v2h20V7L12 2zm0 2.5L17.5 7h-11L12 4.5zM2 22h20v-2H2v2zm2-3h16v-7H4v7zm2-5h12v3H6v-3z"/>
      </svg>
    ),
    color: '#FF9800',
  },
  // Camera/Photo
  {
    id: 'camera',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="3.2"/>
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    ),
    color: '#607D8B',
  },
  // Om/Spiritual
  {
    id: 'om',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c-.04.34-.11.67-.19 1H13v-1zm0 3h5.92c-.2.35-.43.69-.68 1H13v-1zm0 3h2.87c-.87.48-1.84.8-2.87.93V19z"/>
      </svg>
    ),
    color: '#FF5722',
  },
  // Kalash
  {
    id: 'kalash',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 .5.1 1 .2 1.5H6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h.5c.5 3.5 3.5 6 7.5 6s7-2.5 7.5-6h.5c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-1.7c.1-.5.2-1 .2-1.5C16.5 4 14.5 2 12 2zm0 2c1.4 0 2.5 1.1 2.5 2.5S13.4 9 12 9s-2.5-1.1-2.5-2.5S10.6 4 12 4z"/>
      </svg>
    ),
    color: '#D4AF37',
  },
  // Diya/Lamp
  {
    id: 'diya',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72V7h2V5.72c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2zm-7 9c0 3.87 3.13 7 7 7s7-3.13 7-7H5zm7 5c-2.76 0-5-2.24-5-5h10c0 2.76-2.24 5-5 5zM3 20h18v2H3v-2z"/>
      </svg>
    ),
    color: '#FF9800',
  },
  // Hands together/Namaste
  {
    id: 'namaste',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.5 2c-.28 0-.5.22-.5.5V3c-1.3 0-2.4.84-2.82 2H8c-.28 0-.5.22-.5.5s.22.5.5.5h1v1.5H8c-.28 0-.5.22-.5.5s.22.5.5.5h1v1.5H8c-.28 0-.5.22-.5.5s.22.5.5.5h1.18c.42 1.16 1.52 2 2.82 2v.5c0 .28.22.5.5.5s.5-.22.5-.5V13c1.3 0 2.4-.84 2.82-2H17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1V8.5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1V6h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1.18c-.42-1.16-1.52-2-2.82-2v-.5c0-.28-.22-.5-.5-.5zM4 17v4h16v-4H4zm2 1h12v2H6v-2z"/>
      </svg>
    ),
    color: '#8BC34A',
  },
];

// Pre-calculated icon positions to avoid hydration mismatch from Math.cos/sin
// Calculated using: angle = (index / 12) * 2 * PI - PI/2, radius = 55, offset = 80 - 16 = 64
const iconPositions = [
  { x: 64, y: 9 },    // 0: top
  { x: 91, y: 16 },   // 1
  { x: 112, y: 36 },  // 2
  { x: 119, y: 64 },  // 3: right
  { x: 112, y: 92 },  // 4
  { x: 91, y: 112 },  // 5
  { x: 64, y: 119 },  // 6: bottom
  { x: 37, y: 112 },  // 7
  { x: 16, y: 92 },   // 8
  { x: 9, y: 64 },    // 9: left
  { x: 16, y: 36 },   // 10
  { x: 37, y: 16 },   // 11
];

export default function SplashLoader({ onLoadingComplete, minDuration = 2500 }: SplashLoaderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through icons
    const iconInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % icons.length);
    }, 200);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (minDuration / 50));
      });
    }, 50);

    // Complete loading
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 500);
    }, minDuration);

    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [minDuration, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FFFEF0 0%, #FFF5E6 50%, #FFE4C4 100%)',
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              backgroundColor: '#D4AF37',
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Circular icon display */}
        <div className="relative w-40 h-40 mb-8">
          {/* Outer rotating ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-dashed"
            style={{
              borderColor: '#D4AF37',
              animation: 'spin 8s linear infinite',
            }}
          />

          {/* Inner glow ring */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />

          {/* Icons orbit */}
          <div className="absolute inset-0">
            {icons.map((icon, index) => {
              const pos = iconPositions[index];
              const isActive = index === activeIndex;

              return (
                <div
                  key={icon.id}
                  className={`absolute w-8 h-8 transition-all duration-300 ${
                    isActive ? 'scale-150 z-10' : 'scale-100 opacity-40'
                  }`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    color: icon.color,
                    filter: isActive ? `drop-shadow(0 0 10px ${icon.color})` : 'none',
                  }}
                >
                  {icon.svg}
                </div>
              );
            })}
          </div>

          {/* Center icon (larger, current) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'pulse 1s ease-in-out infinite' }}
          >
            <div
              className="w-16 h-16 transition-all duration-300"
              style={{
                color: icons[activeIndex].color,
                filter: `drop-shadow(0 0 20px ${icons[activeIndex].color})`,
              }}
            >
              {icons[activeIndex].svg}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#800020',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          विवाह बायोडाटा
        </h1>
        <p className="text-amber-700 text-lg mb-8 font-medium">
          Marriage Biodata Builder
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-amber-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s linear infinite',
            }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-amber-600 text-sm animate-pulse">
          {progress < 30 ? 'Preparing your experience...' :
           progress < 60 ? 'Loading beautiful templates...' :
           progress < 90 ? 'Almost ready...' :
           'Welcome!'}
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
