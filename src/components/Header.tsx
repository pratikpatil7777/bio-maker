'use client';

import React from 'react';
import KrishnaIcon from './KrishnaIcon';
import { translations, Language } from '@/lib/translations';

interface HeaderProps {
  language: Language;
  name: string;
  nameMarathi: string;
}

export default function Header({ language, name, nameMarathi }: HeaderProps) {
  const t = translations[language];
  const displayName = language === 'en' ? name : nameMarathi;

  return (
    <header className="text-center" style={{ paddingBottom: '8px' }}>
      {/* Krishna Icon */}
      <div className="flex justify-center" style={{ marginBottom: '8px' }}>
        <KrishnaIcon className="w-24 h-auto md:w-28" />
      </div>

      {/* Name */}
      <h1
        className={`biodata-name ${
          language === 'mr' ? 'marathi-header' : ''
        }`}
        style={{
          fontFamily: language === 'mr' ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
          color: 'var(--theme-header-text, #800020)',
          marginBottom: '0',
        }}
      >
        {displayName}
      </h1>
    </header>
  );
}
