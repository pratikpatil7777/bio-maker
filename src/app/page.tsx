'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import EmptyState from '@/components/EmptyState';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';

// Dynamically import the reveal component
const PremiumReveal = dynamic(() => import('@/components/PremiumReveal'), {
  ssr: false,
});

// Skeleton loader for the landing page - shows immediately
function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFEF8] via-[#FFF9E8] to-[#FFEDD5]">
      {/* Nav skeleton */}
      <div className="py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-amber-200/50 animate-pulse" />
            <div className="hidden sm:block w-24 h-6 rounded bg-amber-200/30 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-8 rounded-full bg-amber-200/30 animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-amber-200/30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - text */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="h-12 w-3/4 rounded-lg bg-gradient-to-r from-amber-200/50 to-amber-100/30 animate-pulse" />
              <div className="h-14 w-full rounded-lg bg-gradient-to-r from-amber-200/50 to-amber-100/30 animate-pulse" />
            </div>
            <div className="h-1 w-40 rounded bg-amber-300/30 animate-pulse mx-auto lg:mx-0" />
            <div className="space-y-2">
              <div className="h-5 w-full rounded bg-amber-100/50 animate-pulse" />
              <div className="h-5 w-5/6 rounded bg-amber-100/50 animate-pulse" />
            </div>
            <div className="flex gap-3 justify-center lg:justify-start">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-28 rounded-full bg-amber-200/30 animate-pulse" />
              ))}
            </div>
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <div className="h-14 w-48 rounded-2xl bg-gradient-to-r from-amber-400/50 to-orange-400/50 animate-pulse" />
              <div className="h-14 w-40 rounded-2xl bg-amber-200/30 animate-pulse" />
            </div>
          </div>

          {/* Right side - card preview */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-amber-300/20 blur-3xl animate-pulse" />
              <div className="relative w-[300px] h-[400px] rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl overflow-hidden">
                <div className="absolute inset-0 border-8 border-amber-200/50 rounded-2xl" />
                <div className="p-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-300/50 animate-pulse mb-3" />
                  <div className="w-24 h-3 rounded bg-amber-200/50 animate-pulse mb-4" />
                  <div className="w-16 h-20 rounded bg-amber-200/30 animate-pulse mb-4" />
                  <div className="w-32 h-4 rounded bg-amber-200/50 animate-pulse mb-6" />
                  <div className="w-full space-y-2">
                    <div className="h-3 w-full rounded bg-amber-100/50 animate-pulse" />
                    <div className="h-3 w-5/6 rounded bg-amber-100/50 animate-pulse" />
                    <div className="h-3 w-4/6 rounded bg-amber-100/50 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSeenReveal, setHasSeenReveal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Local state for customization (will be passed to app)
  const [language, setLanguage] = useState<Language>('en');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentBorder, setCurrentBorder] = useState<BorderDesign>(borderDesigns[0]);

  useEffect(() => {
    setIsClient(true);
    // Check if user has seen reveal in this session
    const seen = sessionStorage.getItem('reveal-seen');
    if (seen) {
      setHasSeenReveal(true);
      setIsRevealed(true);
    }
  }, []);

  const handleRevealComplete = () => {
    sessionStorage.setItem('reveal-seen', 'true');
    setIsRevealed(true);
    setHasSeenReveal(true);
  };

  const handleStartBuilding = () => {
    // Store preferences and navigate to app
    localStorage.setItem('bio-maker-language', language);
    localStorage.setItem('bio-maker-theme', currentTheme.id);
    localStorage.setItem('bio-maker-border', currentBorder.id);
    router.push('/app');
  };

  const handleUseTemplate = () => {
    // Store preferences and navigate to app
    localStorage.setItem('bio-maker-language', language);
    localStorage.setItem('bio-maker-theme', currentTheme.id);
    localStorage.setItem('bio-maker-border', currentBorder.id);
    router.push('/app');
  };

  // Server-side and initial client render - show skeleton
  if (!isClient) {
    return <LandingPageSkeleton />;
  }

  return (
    <>
      {/* Premium reveal overlay - only on first visit, fast 1.6s animation */}
      {!hasSeenReveal && (
        <PremiumReveal
          onRevealComplete={handleRevealComplete}
          skipReveal={false}
        />
      )}

      {/* Main content - always rendered, revealed after animation */}
      <Suspense fallback={<LandingPageSkeleton />}>
        <div
          style={{
            opacity: isRevealed ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <EmptyState
            language={language}
            onLanguageChange={setLanguage}
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
            currentBorder={currentBorder}
            onBorderChange={setCurrentBorder}
            onStartBuilding={handleStartBuilding}
            onUseTemplate={handleUseTemplate}
          />
        </div>
      </Suspense>
    </>
  );
}
