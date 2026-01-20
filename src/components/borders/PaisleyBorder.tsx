'use client';

import React from 'react';

interface PaisleyBorderProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function PaisleyBorder({ primaryColor, secondaryColor }: PaisleyBorderProps) {
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
          top: '6px',
          left: '6px',
          right: '6px',
          bottom: '6px',
        }}
      />

      {/* Top Paisley Pattern */}
      <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 800 60" preserveAspectRatio="none">
        <defs>
          <pattern id="paisley-top" x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
            {/* Paisley motif */}
            <path
              d="M40 8 C55 8 60 20 55 32 C50 44 35 48 25 40 C15 32 18 18 28 12 C32 10 36 8 40 8 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M40 14 C50 14 53 22 50 30 C47 38 38 40 32 35 C26 30 28 20 35 16 C37 15 39 14 40 14 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1"
              opacity="0.4"
            />
            {/* Small decorative dots */}
            <circle cx="40" cy="24" r="2" fill={primaryColor} opacity="0.5" />
            <circle cx="20" cy="50" r="1.5" fill={secondaryColor} opacity="0.4" />
            <circle cx="60" cy="50" r="1.5" fill={secondaryColor} opacity="0.4" />
          </pattern>
        </defs>
        <rect x="10" y="8" width="780" height="50" fill="url(#paisley-top)" />
      </svg>

      {/* Bottom Paisley Pattern */}
      <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 800 60" preserveAspectRatio="none">
        <defs>
          <pattern id="paisley-bottom" x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M40 52 C55 52 60 40 55 28 C50 16 35 12 25 20 C15 28 18 42 28 48 C32 50 36 52 40 52 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M40 46 C50 46 53 38 50 30 C47 22 38 20 32 25 C26 30 28 40 35 44 C37 45 39 46 40 46 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1"
              opacity="0.4"
            />
            <circle cx="40" cy="36" r="2" fill={primaryColor} opacity="0.5" />
            <circle cx="20" cy="10" r="1.5" fill={secondaryColor} opacity="0.4" />
            <circle cx="60" cy="10" r="1.5" fill={secondaryColor} opacity="0.4" />
          </pattern>
        </defs>
        <rect x="10" y="2" width="780" height="50" fill="url(#paisley-bottom)" />
      </svg>

      {/* Left Paisley Pattern */}
      <svg className="absolute top-16 left-0 h-[calc(100%-128px)] w-14" viewBox="0 0 50 400" preserveAspectRatio="none">
        <defs>
          <pattern id="paisley-left" x="0" y="0" width="50" height="70" patternUnits="userSpaceOnUse">
            <path
              d="M8 35 C8 20 20 15 32 20 C44 25 48 40 40 50 C32 60 18 57 12 47 C10 43 8 39 8 35 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle cx="24" cy="35" r="2" fill={primaryColor} opacity="0.5" />
          </pattern>
        </defs>
        <rect x="6" y="0" width="40" height="400" fill="url(#paisley-left)" />
      </svg>

      {/* Right Paisley Pattern */}
      <svg className="absolute top-16 right-0 h-[calc(100%-128px)] w-14" viewBox="0 0 50 400" preserveAspectRatio="none">
        <defs>
          <pattern id="paisley-right" x="0" y="0" width="50" height="70" patternUnits="userSpaceOnUse">
            <path
              d="M42 35 C42 20 30 15 18 20 C6 25 2 40 10 50 C18 60 32 57 38 47 C40 43 42 39 42 35 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle cx="26" cy="35" r="2" fill={primaryColor} opacity="0.5" />
          </pattern>
        </defs>
        <rect x="4" y="0" width="40" height="400" fill="url(#paisley-right)" />
      </svg>

      {/* Corner Flourishes */}
      {/* Top Left */}
      <svg className="absolute top-1 left-1 w-20 h-20" viewBox="0 0 80 80">
        <path
          d="M10 70 Q10 10 70 10"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M15 60 Q15 15 60 15"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="20" cy="20" r="4" fill={secondaryColor} opacity="0.6" />
      </svg>

      {/* Top Right */}
      <svg className="absolute top-1 right-1 w-20 h-20" viewBox="0 0 80 80">
        <path
          d="M70 70 Q70 10 10 10"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M65 60 Q65 15 20 15"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="60" cy="20" r="4" fill={secondaryColor} opacity="0.6" />
      </svg>

      {/* Bottom Left */}
      <svg className="absolute bottom-1 left-1 w-20 h-20" viewBox="0 0 80 80">
        <path
          d="M10 10 Q10 70 70 70"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M15 20 Q15 65 60 65"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="20" cy="60" r="4" fill={secondaryColor} opacity="0.6" />
      </svg>

      {/* Bottom Right */}
      <svg className="absolute bottom-1 right-1 w-20 h-20" viewBox="0 0 80 80">
        <path
          d="M70 10 Q70 70 10 70"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M65 20 Q65 65 20 65"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="60" cy="60" r="4" fill={secondaryColor} opacity="0.6" />
      </svg>
    </div>
  );
}
