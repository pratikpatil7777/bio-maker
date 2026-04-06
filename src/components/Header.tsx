'use client';

import React from 'react';
import KrishnaIcon from './KrishnaIcon';
import { GodSymbolId, Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import { GaneshIcon, OmIcon, SwastikIcon, ShivIcon, DurgaIcon } from './GodSymbolSelector';

interface HeaderProps {
  language: Language;
  name: string;
  nameMarathi: string;
  nameHindi?: string;
  godSymbolId?: GodSymbolId;
  customGodSymbol?: string;
  primaryColor?: string;
}

export default function Header({
  language,
  name,
  nameMarathi,
  nameHindi,
  godSymbolId = 'krishna',
  customGodSymbol,
  primaryColor = '#D4AF37',
}: HeaderProps) {
  const t = translations[language];
  const isDevanagari = language === 'mr' || language === 'hi';
  const displayName = language === 'hi'
    ? (nameHindi || nameMarathi || name)
    : language === 'mr'
      ? (nameMarathi || name)
      : name;

  const renderGodSymbol = () => {
    switch (godSymbolId) {
      case 'krishna':
        return <KrishnaIcon className="w-28 h-auto" />;
      case 'ganesh':
        return <GaneshIcon color={primaryColor} className="w-20 h-20" />;
      case 'om':
        return <OmIcon color={primaryColor} className="w-20 h-16" />;
      case 'swastik':
        return <SwastikIcon color={primaryColor} className="w-16 h-16" />;
      case 'shiv':
        return <ShivIcon color={primaryColor} className="w-16 h-20" />;
      case 'durga':
        return <DurgaIcon color={primaryColor} className="w-20 h-16" />;
      case 'custom':
        if (customGodSymbol) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={customGodSymbol}
              alt="Custom Symbol"
              className="w-auto h-20 object-contain"
              style={{ maxWidth: '100px' }}
            />
          );
        }
        return null;
      case 'none':
        return null;
      default:
        return <KrishnaIcon className="w-28 h-auto" />;
    }
  };

  return (
    <header className="text-center" style={{ paddingBottom: '8px' }}>
      {/* God Symbol */}
      {godSymbolId !== 'none' && (
        <div className="flex justify-center" style={{ marginBottom: '8px' }}>
          {renderGodSymbol()}
        </div>
      )}

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
