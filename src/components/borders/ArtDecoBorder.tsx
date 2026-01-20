'use client';

import React from 'react';

interface ArtDecoBorderProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function ArtDecoBorder({ primaryColor, secondaryColor }: ArtDecoBorderProps) {
  // Art Deco corner fan
  const DecoCorner = ({ rotate = 0 }: { rotate?: number }) => (
    <svg viewBox="0 0 100 100" className="w-24 h-24" style={{ transform: `rotate(${rotate}deg)` }}>
      {/* Radiating lines (sunburst effect) */}
      {[0, 15, 30, 45, 60, 75, 90].map((angle) => (
        <line
          key={angle}
          x1="10"
          y1="90"
          x2={10 + Math.cos((angle * Math.PI) / 180) * 70}
          y2={90 - Math.sin((angle * Math.PI) / 180) * 70}
          stroke={primaryColor}
          strokeWidth={angle === 45 ? "2" : "1"}
          opacity={angle === 45 ? 0.8 : 0.4}
        />
      ))}

      {/* Concentric arcs */}
      <path
        d="M10 60 A50 50 0 0 1 60 10"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M10 45 A45 45 0 0 1 45 10"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M10 30 A30 30 0 0 1 30 10"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Decorative chevrons */}
      <path
        d="M15 75 L25 65 L35 75"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M75 15 L65 25 L75 35"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Corner accent */}
      <circle cx="10" cy="90" r="4" fill={secondaryColor} opacity="0.7" />
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Triple line border - Art Deco style */}
      <div
        className="absolute inset-0 border-[4px]"
        style={{ borderColor: primaryColor }}
      />
      <div
        className="absolute border-[1px]"
        style={{
          borderColor: primaryColor,
          top: '8px',
          left: '8px',
          right: '8px',
          bottom: '8px',
          opacity: 0.6,
        }}
      />
      <div
        className="absolute border-[1px]"
        style={{
          borderColor: primaryColor,
          top: '12px',
          left: '12px',
          right: '12px',
          bottom: '12px',
          opacity: 0.3,
        }}
      />

      {/* Top geometric pattern */}
      <svg className="absolute top-1 left-24 right-24 h-10" preserveAspectRatio="none" viewBox="0 0 600 40">
        {/* Zigzag pattern */}
        <path
          d="M0 30 L20 10 L40 30 L60 10 L80 30 L100 10 L120 30 L140 10 L160 30 L180 10 L200 30 L220 10 L240 30 L260 10 L280 30 L300 10 L320 30 L340 10 L360 30 L380 10 L400 30 L420 10 L440 30 L460 10 L480 30 L500 10 L520 30 L540 10 L560 30 L580 10 L600 30"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Dots at peaks */}
        {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580].map((x) => (
          <circle key={x} cx={x} cy="10" r="2" fill={primaryColor} opacity="0.4" />
        ))}
      </svg>

      {/* Bottom geometric pattern */}
      <svg className="absolute bottom-1 left-24 right-24 h-10" preserveAspectRatio="none" viewBox="0 0 600 40">
        <path
          d="M0 10 L20 30 L40 10 L60 30 L80 10 L100 30 L120 10 L140 30 L160 10 L180 30 L200 10 L220 30 L240 10 L260 30 L280 10 L300 30 L320 10 L340 30 L360 10 L380 30 L400 10 L420 30 L440 10 L460 30 L480 10 L500 30 L520 10 L540 30 L560 10 L580 30 L600 10"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
        {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580].map((x) => (
          <circle key={x} cx={x} cy="30" r="2" fill={primaryColor} opacity="0.4" />
        ))}
      </svg>

      {/* Left geometric pattern */}
      <svg className="absolute left-1 top-24 bottom-24 w-10" preserveAspectRatio="none" viewBox="0 0 40 600">
        <path
          d="M30 0 L10 20 L30 40 L10 60 L30 80 L10 100 L30 120 L10 140 L30 160 L10 180 L30 200 L10 220 L30 240 L10 260 L30 280 L10 300 L30 320 L10 340 L30 360 L10 380 L30 400 L10 420 L30 440 L10 460 L30 480 L10 500 L30 520 L10 540 L30 560 L10 580 L30 600"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Right geometric pattern */}
      <svg className="absolute right-1 top-24 bottom-24 w-10" preserveAspectRatio="none" viewBox="0 0 40 600">
        <path
          d="M10 0 L30 20 L10 40 L30 60 L10 80 L30 100 L10 120 L30 140 L10 160 L30 180 L10 200 L30 220 L10 240 L30 260 L10 280 L30 300 L10 320 L30 340 L10 360 L30 380 L10 400 L30 420 L10 440 L30 460 L10 480 L30 500 L10 520 L30 540 L10 560 L30 580 L10 600"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Center top diamond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 60 30" className="w-14 h-7">
          <path
            d="M30 5 L50 15 L30 25 L10 15 Z"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M30 10 L40 15 L30 20 L20 15 Z"
            fill={secondaryColor}
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Center bottom diamond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 60 30" className="w-14 h-7">
          <path
            d="M30 5 L50 15 L30 25 L10 15 Z"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M30 10 L40 15 L30 20 L20 15 Z"
            fill={secondaryColor}
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Art Deco Fan Corners */}
      <div className="absolute top-0 left-0">
        <DecoCorner rotate={0} />
      </div>
      <div className="absolute top-0 right-0">
        <DecoCorner rotate={90} />
      </div>
      <div className="absolute bottom-0 left-0">
        <DecoCorner rotate={-90} />
      </div>
      <div className="absolute bottom-0 right-0">
        <DecoCorner rotate={180} />
      </div>
    </div>
  );
}
