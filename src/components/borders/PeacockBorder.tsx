'use client';

import React from 'react';

interface PeacockBorderProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function PeacockBorder({ primaryColor, secondaryColor }: PeacockBorderProps) {
  // Peacock feather component
  const PeacockFeather = ({ flip = false }: { flip?: boolean }) => (
    <svg
      viewBox="0 0 60 100"
      className="w-14 h-24"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      {/* Feather shaft */}
      <path
        d="M30 95 Q30 50 30 5"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Outer feather shape */}
      <path
        d="M30 10 Q5 30 10 55 Q15 70 30 75 Q45 70 50 55 Q55 30 30 10"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Inner feather layers */}
      <path
        d="M30 18 Q12 32 16 50 Q20 62 30 66 Q40 62 44 50 Q48 32 30 18"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        opacity="0.5"
      />

      <path
        d="M30 25 Q18 35 21 48 Q24 56 30 58 Q36 56 39 48 Q42 35 30 25"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Eye of the feather */}
      <ellipse
        cx="30"
        cy="42"
        rx="10"
        ry="14"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        opacity="0.8"
      />
      <ellipse
        cx="30"
        cy="42"
        rx="6"
        ry="9"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1"
        opacity="0.7"
      />
      <ellipse
        cx="30"
        cy="42"
        rx="3"
        ry="5"
        fill={primaryColor}
        opacity="0.6"
      />

      {/* Decorative lines (barbs) */}
      {[20, 30, 40, 50, 60, 70].map((y) => (
        <React.Fragment key={y}>
          <line
            x1="30"
            y1={y}
            x2={15 + (y - 20) * 0.2}
            y2={y - 3}
            stroke={primaryColor}
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="30"
            y1={y}
            x2={45 - (y - 20) * 0.2}
            y2={y - 3}
            stroke={primaryColor}
            strokeWidth="0.5"
            opacity="0.3"
          />
        </React.Fragment>
      ))}
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main border with elegant curve */}
      <div
        className="absolute inset-0 border-[3px]"
        style={{ borderColor: primaryColor }}
      />

      {/* Inner border */}
      <div
        className="absolute border-[1px]"
        style={{
          borderColor: primaryColor,
          top: '6px',
          left: '6px',
          right: '6px',
          bottom: '6px',
          opacity: 0.4,
        }}
      />

      {/* Decorative wave pattern along top */}
      <svg className="absolute top-2 left-24 right-24 h-8" preserveAspectRatio="none" viewBox="0 0 600 30">
        <path
          d="M0 15 Q50 5 100 15 Q150 25 200 15 Q250 5 300 15 Q350 25 400 15 Q450 5 500 15 Q550 25 600 15"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Decorative wave pattern along bottom */}
      <svg className="absolute bottom-2 left-24 right-24 h-8" preserveAspectRatio="none" viewBox="0 0 600 30">
        <path
          d="M0 15 Q50 25 100 15 Q150 5 200 15 Q250 25 300 15 Q350 5 400 15 Q450 25 500 15 Q550 5 600 15"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Small feather accents along sides */}
      <svg className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-12" viewBox="0 0 24 48">
        <ellipse cx="12" cy="24" rx="6" ry="18" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.3" />
        <ellipse cx="12" cy="24" rx="3" ry="10" fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>
      <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-12" viewBox="0 0 24 48">
        <ellipse cx="12" cy="24" rx="6" ry="18" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.3" />
        <ellipse cx="12" cy="24" rx="3" ry="10" fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Corner Peacock Feathers */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 -rotate-45 origin-bottom-right translate-x-2 -translate-y-2">
        <PeacockFeather />
      </div>

      {/* Top Right */}
      <div className="absolute top-0 right-0 rotate-45 origin-bottom-left -translate-x-2 -translate-y-2">
        <PeacockFeather flip />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 rotate-[225deg] origin-top-right translate-x-2 translate-y-2">
        <PeacockFeather />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 rotate-[135deg] origin-top-left -translate-x-2 translate-y-2">
        <PeacockFeather flip />
      </div>

      {/* Center top decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
        <svg viewBox="0 0 60 30" className="w-16 h-8">
          <path
            d="M30 28 Q10 20 5 5"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M30 28 Q50 20 55 5"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle cx="30" cy="28" r="3" fill={secondaryColor} opacity="0.6" />
          <circle cx="5" cy="5" r="2" fill={primaryColor} opacity="0.5" />
          <circle cx="55" cy="5" r="2" fill={primaryColor} opacity="0.5" />
        </svg>
      </div>

      {/* Center bottom decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
        <svg viewBox="0 0 60 30" className="w-16 h-8 rotate-180">
          <path
            d="M30 28 Q10 20 5 5"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M30 28 Q50 20 55 5"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle cx="30" cy="28" r="3" fill={secondaryColor} opacity="0.6" />
          <circle cx="5" cy="5" r="2" fill={primaryColor} opacity="0.5" />
          <circle cx="55" cy="5" r="2" fill={primaryColor} opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
