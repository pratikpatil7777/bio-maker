'use client';

import React, { Suspense, useState, useEffect } from 'react';
import BiodataBuilder from '@/components/BiodataBuilder';
import SplashLoader from '@/components/SplashLoader';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

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
      <BiodataBuilder />
    </Suspense>
  );
}
