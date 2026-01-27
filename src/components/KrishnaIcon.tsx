'use client';

import React from 'react';

interface KrishnaIconProps {
  className?: string;
}

export default function KrishnaIcon({ className = '' }: KrishnaIconProps) {
  // Using regular img tag for better html2canvas compatibility in PDF export
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Radhe-Krishna-Flute.png"
      alt="Radhe Krishna with Flute"
      width={160}
      height={160}
      className={`object-contain ${className}`}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}
