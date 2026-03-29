'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashLoader from '@/components/SplashLoader';
import EmptyState from '@/components/EmptyState';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';

export default function HomePage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  // Local state for customization (will be passed to app)
  const [language, setLanguage] = useState<Language>('en');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentBorder, setCurrentBorder] = useState<BorderDesign>(borderDesigns[0]);

  useEffect(() => {
    // Check if user has seen splash in this session
    const seen = sessionStorage.getItem('splash-seen');
    if (seen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('splash-seen', 'true');
    setShowSplash(false);
    setHasSeenSplash(true);
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

  // Show splash only on first visit per session
  if (showSplash && !hasSeenSplash) {
    return <SplashLoader onLoadingComplete={handleLoadingComplete} minDuration={2800} />;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF0]">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    }>
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
    </Suspense>
  );
}
