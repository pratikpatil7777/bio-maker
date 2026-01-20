'use client';

import React from 'react';

interface SectionDividerProps {
  variant?: 'flute' | 'star' | 'lotus';
}

export default function SectionDivider({ variant = 'star' }: SectionDividerProps) {
  const getIcon = () => {
    switch (variant) {
      case 'flute':
        return (
          <svg viewBox="0 0 40 20" className="w-10 h-5" fill="#D4AF37">
            <rect x="0" y="8" width="40" height="4" rx="2" />
            <circle cx="8" cy="10" r="1.5" fill="#800020" />
            <circle cx="16" cy="10" r="1.5" fill="#800020" />
            <circle cx="24" cy="10" r="1.5" fill="#800020" />
            <circle cx="32" cy="10" r="1.5" fill="#800020" />
          </svg>
        );
      case 'lotus':
        return (
          <svg viewBox="0 0 30 20" className="w-8 h-5" fill="#D4AF37">
            <path d="M15 0 Q10 10, 15 20 Q20 10, 15 0" opacity="0.8" />
            <path d="M15 5 Q5 10, 8 18 Q12 12, 15 5" opacity="0.6" />
            <path d="M15 5 Q25 10, 22 18 Q18 12, 15 5" opacity="0.6" />
          </svg>
        );
      default:
        return <span className="text-lg">✦</span>;
    }
  };

  return (
    <div className="section-divider my-4">
      {getIcon()}
    </div>
  );
}
