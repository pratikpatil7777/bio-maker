'use client';

import React from 'react';
import KrishnaIcon from './KrishnaIcon';
import { translations, Language } from '@/lib/translations';

interface HeaderProps {
  language: Language;
  name: string;
  nameMarathi: string;
  nameHindi?: string;
}

export default function Header({ language, name, nameMarathi, nameHindi }: HeaderProps) {
  const t = translations[language];
  const isDevanagari = language === 'mr' || language === 'hi';
  const displayName = language === 'hi'
    ? (nameHindi || nameMarathi || name)
    : language === 'mr'
      ? (nameMarathi || name)
      : name;

  return (
    <header className="text-center" style={{ paddingBottom: '8px' }}>
      {/* Krishna Icon */}
      <div className="flex justify-center" style={{ marginBottom: '8px' }}>
        <KrishnaIcon className="w-28 h-auto" />
      </div>

      {/* Name */}
      <h1
        className={`biodata-name ${
          isDevanagari ? 'marathi-header' : ''
        }`}
        style={{
          fontFamily: isDevanagari ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
          color: 'var(--theme-header-text, #800020)',
          marginBottom: '0',
        }}
      >
        {displayName}
      </h1>
    </header>
  );
}
