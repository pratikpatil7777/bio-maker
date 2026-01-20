'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  return (
    <footer className="text-center pt-6 pb-2">
      {/* Thank You in script font */}
      <p
        className="text-[#800020] text-2xl script-font"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        {t.thankYou}
      </p>
    </footer>
  );
}
