'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PremiumReveal from '@/components/PremiumReveal';
import EmptyState from '@/components/EmptyState';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';

export default function HomePage() {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSeenReveal, setHasSeenReveal] = useState<boolean | null>(null);

  // Local state for customization (will be passed to app)
  const [language, setLanguage] = useState<Language>('en');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentBorder, setCurrentBorder] = useState<BorderDesign>(borderDesigns[0]);

  useEffect(() => {
    // Check if user has seen reveal in this session
    const seen = sessionStorage.getItem('reveal-seen');
    if (seen) {
      setHasSeenReveal(true);
      setIsRevealed(true);
    } else {
      setHasSeenReveal(false);
    }
  }, []);

  const handleRevealComplete = () => {
    sessionStorage.setItem('reveal-seen', 'true');
    setIsRevealed(true);
    setHasSeenReveal(true);
  };

  const handleStartBuilding = () => {
    localStorage.setItem('bio-maker-language', language);
    localStorage.setItem('bio-maker-theme', currentTheme.id);
    localStorage.setItem('bio-maker-border', currentBorder.id);
    router.push('/app');
  };

  const handleUseTemplate = () => {
    localStorage.setItem('bio-maker-language', language);
    localStorage.setItem('bio-maker-theme', currentTheme.id);
    localStorage.setItem('bio-maker-border', currentBorder.id);
    router.push('/app');
  };

  // Still checking session storage - show reveal background to prevent flicker
  if (hasSeenReveal === null) {
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: 'linear-gradient(135deg, #FFF9F0 0%, #FFEDD5 50%, #FDE68A 100%)',
        }}
      />
    );
  }

  return (
    <>
      {/* Premium reveal overlay - only on first visit */}
      {!hasSeenReveal && (
        <PremiumReveal
          onRevealComplete={handleRevealComplete}
          skipReveal={false}
        />
      )}

      {/* Main content - hidden until reveal completes */}
      <Suspense fallback={null}>
        <div
          style={{
            opacity: isRevealed ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: isRevealed ? 'auto' : 'none',
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
