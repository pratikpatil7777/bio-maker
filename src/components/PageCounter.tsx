'use client';

import React from 'react';
import { Language } from '@/lib/types';

interface PageCounterProps {
  pageCount: number;
  language: Language;
}

export default function PageCounter({ pageCount, language }: PageCounterProps) {
  const isMarathi = language === 'mr';

  if (pageCount <= 1) return null;

  return (
    <div className="page-counter no-print">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>
        {pageCount} {isMarathi ? 'पाने' : 'pages'}
      </span>
    </div>
  );
}
