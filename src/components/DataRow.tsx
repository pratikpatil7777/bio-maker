'use client';

import React from 'react';

interface DataRowProps {
  label: string;
  value: React.ReactNode;
  isMarathi?: boolean;
}

export default function DataRow({ label, value, isMarathi = false }: DataRowProps) {
  return (
    <div className="flex items-start py-0.5">
      <span
        className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
        style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
      >
        {label}
      </span>
      <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
      <span
        className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
        style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
      >
        {value}
      </span>
    </div>
  );
}
