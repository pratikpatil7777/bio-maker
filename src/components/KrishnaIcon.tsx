'use client';

import React from 'react';
import Image from 'next/image';

interface KrishnaIconProps {
  className?: string;
}

export default function KrishnaIcon({ className = '' }: KrishnaIconProps) {
  return (
    <Image
      src="/Radhe-Krishna-Flute.png"
      alt="Radhe Krishna with Flute"
      width={160}
      height={160}
      className={`object-contain ${className}`}
      priority
    />
  );
}
