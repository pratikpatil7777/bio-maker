'use client';

import React from 'react';

interface ClassicBorderProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function ClassicBorder({ primaryColor, secondaryColor }: ClassicBorderProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Outer border */}
      <div
        className="absolute inset-0 border-[3px]"
        style={{ borderColor: primaryColor }}
      />

      {/* Inner border */}
      <div
        className="absolute border-[1px]"
        style={{
          borderColor: primaryColor,
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '4px',
        }}
      />

      {/* Corner flourishes */}
      {/* Top Right */}
      <div
        className="absolute top-2 right-2 text-xl"
        style={{ color: primaryColor }}
      >
        ❧
      </div>

      {/* Bottom Right */}
      <div
        className="absolute bottom-2 right-2 text-xl rotate-180"
        style={{ color: primaryColor }}
      >
        ❧
      </div>

      {/* Top Left */}
      <div
        className="absolute top-2 left-2 text-xl -scale-x-100"
        style={{ color: primaryColor }}
      >
        ❧
      </div>

      {/* Bottom Left */}
      <div
        className="absolute bottom-2 left-2 text-xl rotate-180 -scale-x-100"
        style={{ color: primaryColor }}
      >
        ❧
      </div>
    </div>
  );
}
