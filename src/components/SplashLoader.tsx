'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashLoaderProps {
  onLoadingComplete: () => void;
  minDuration?: number;
}

// Biodata feature cards for 3D showcase
const biodataFeatures = [
  {
    id: 1,
    title: 'Personal Details',
    titleMr: 'वैयक्तिक माहिती',
    icon: '👤',
    color: '#D4AF37',
    items: ['Name', 'Date of Birth', 'Height', 'Complexion'],
  },
  {
    id: 2,
    title: 'Family Background',
    titleMr: 'कौटुंबिक पार्श्वभूमी',
    icon: '👨‍👩‍👧‍👦',
    color: '#800020',
    items: ['Father', 'Mother', 'Siblings', 'Family Values'],
  },
  {
    id: 3,
    title: 'Education & Career',
    titleMr: 'शिक्षण व करिअर',
    icon: '🎓',
    color: '#B8860B',
    items: ['Qualification', 'Profession', 'Income', 'Workplace'],
  },
  {
    id: 4,
    title: 'Lifestyle & Interests',
    titleMr: 'जीवनशैली',
    icon: '🎯',
    color: '#A52A2A',
    items: ['Hobbies', 'Diet', 'Lifestyle', 'Expectations'],
  },
];

export default function SplashLoader({ onLoadingComplete, minDuration = 4000 }: SplashLoaderProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start logo animation
    const contentTimer = setTimeout(() => setShowContent(true), 100);
    // Start card animations after logo appears
    const showTimer = setTimeout(() => setShowCards(true), 600);

    // Cycle through cards
    const cardInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % biodataFeatures.length);
    }, 900);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (minDuration / 50)), 100));
    }, 50);

    // Complete loading
    const completeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 600);
    }, minDuration);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(showTimer);
      clearInterval(cardInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [minDuration, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-600 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FFF9F0 0%, #FFEDD5 30%, #FDE68A 70%, #FBBF24 100%)',
        perspective: '1500px',
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z' fill='%23D4AF37' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            animation: 'patternMove 20s linear infinite',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + ((i * 17) % 60)}%`,
              animation: `float3D ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: i % 2 === 0
                  ? 'radial-gradient(circle, #FFD700 0%, #D4AF37 100%)'
                  : 'radial-gradient(circle, #A52A2A 0%, #800020 100%)',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Logo and Title Section */}
      <div
        className={`text-center mb-6 transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-90'
        }`}
      >
        {/* Logo with glow effect */}
        <div className="relative inline-block mb-4">
          {/* Glow rings */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
              transform: 'scale(1.5)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(128, 0, 32, 0.3) 0%, transparent 60%)',
              transform: 'scale(1.8)',
              animation: 'pulseGlow 2s ease-in-out infinite 0.5s',
            }}
          />

          {/* Logo Image */}
          <div
            className="relative"
            style={{
              animation: 'logoFloat 3s ease-in-out infinite',
            }}
          >
            <Image
              src="/logo.png"
              alt="Shubh Vivah Logo"
              width={140}
              height={140}
              className="rounded-2xl"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(128, 0, 32, 0.4))',
              }}
              priority
            />
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
            }}
          />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
        </div>

        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #800020 0%, #A52A2A 30%, #800020 60%, #D4AF37 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientText 3s ease infinite',
          }}
        >
          Marriage Biodata Builder
        </h1>
      </div>

      {/* 3D Card Showcase - Carousel Style */}
      <div
        className={`relative w-full max-w-4xl h-56 md:h-64 transition-all duration-700 ${
          showCards ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {biodataFeatures.map((feature, index) => {
          const offset = index - currentCard;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isAdjacent = absOffset === 1;
          const isVisible = absOffset <= 2;

          // Calculate 3D position
          const translateX = offset * 200;
          const translateZ = isActive ? 80 : isAdjacent ? 0 : -80;
          const rotateY = offset * 25;
          const scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7;
          const opacity = isActive ? 1 : isAdjacent ? 0.7 : 0.4;

          return isVisible ? (
            <div
              key={feature.id}
              className="absolute left-1/2 top-1/2 w-48 md:w-56 transition-all duration-500 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: isActive ? 10 : 5 - absOffset,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card */}
              <div
                className="relative rounded-2xl p-5 shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #FFF9F0 100%)',
                  border: `3px solid ${feature.color}`,
                  boxShadow: isActive
                    ? `0 25px 50px rgba(0,0,0,0.25), 0 0 30px ${feature.color}40`
                    : '0 15px 30px rgba(0,0,0,0.15)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-14 h-14 overflow-hidden"
                  style={{ borderRadius: '0 1rem 0 0' }}
                >
                  <div
                    className="absolute -top-7 -right-7 w-14 h-14 rotate-45"
                    style={{ background: feature.color }}
                  />
                </div>

                {/* Icon */}
                <div
                  className="text-3xl md:text-4xl mb-2"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    animation: isActive ? 'iconBounce 1s ease-in-out infinite' : 'none',
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-base md:text-lg font-bold mb-0.5"
                  style={{ color: feature.color }}
                >
                  {feature.titleMr}
                </h3>
                <p className="text-xs text-gray-600 font-medium mb-2">
                  {feature.title}
                </p>

                {/* Feature items with staggered animation */}
                <div className="space-y-1">
                  {feature.items.map((item, itemIndex) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-gray-700"
                      style={{
                        opacity: isActive ? 1 : 0.7,
                        transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `all 0.3s ease ${itemIndex * 0.1}s`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: feature.color }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Shine effect */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 50%, transparent 55%)',
                      animation: 'cardShine 2s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>

      {/* Card indicators */}
      <div className="flex items-center gap-3 mt-4">
        {biodataFeatures.map((_, index) => (
          <div
            key={index}
            className="transition-all duration-300"
            style={{
              width: currentCard === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentCard === index
                ? 'linear-gradient(90deg, #D4AF37, #FFD700)'
                : 'rgba(212, 175, 55, 0.3)',
              boxShadow: currentCard === index ? '0 2px 8px rgba(212, 175, 55, 0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Progress section */}
      <div className="mt-6 w-64 md:w-80">
        {/* Progress bar */}
        <div className="relative h-1.5 rounded-full bg-white/50 overflow-hidden shadow-inner">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="text-center mt-3 text-sm font-medium"
          style={{ color: '#800020' }}
        >
          {progress < 25
            ? '✨ Preparing your experience...'
            : progress < 50
            ? '📋 Loading biodata templates...'
            : progress < 75
            ? '🎨 Setting up beautiful designs...'
            : progress < 100
            ? '💫 Almost there...'
            : '🎊 Welcome!'}
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#800020] via-[#D4AF37] to-[#800020]" />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        @keyframes float3D {
          0%, 100% {
            transform: translateY(0) translateZ(0) rotateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateZ(30px) rotateX(10deg);
            opacity: 1;
          }
        }
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes cardShine {
          0% { transform: translateX(-100%); }
          20%, 100% { transform: translateX(200%); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1.5); }
          50% { opacity: 0.8; transform: scale(1.7); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
