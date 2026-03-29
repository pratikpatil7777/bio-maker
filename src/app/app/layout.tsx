'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // The main /app page uses BiodataBuilder which has its own complete UI
  // Only wrap sub-pages (export, share) with additional layout if needed
  // For now, just pass through children - BiodataBuilder handles its own layout

  return <>{children}</>;
}
