'use client';

import React, { Suspense } from 'react';
import BiodataBuilder from '@/components/BiodataBuilder';

function BiodataBuilderWrapper() {
  return <BiodataBuilder />;
}

export default function AppPlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF0]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-[#D4AF37] text-lg">Loading Bio Maker...</div>
        </div>
      </div>
    }>
      <BiodataBuilderWrapper />
    </Suspense>
  );
}
