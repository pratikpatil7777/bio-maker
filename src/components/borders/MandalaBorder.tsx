'use client';

import React from 'react';

interface MandalaBorderProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function MandalaBorder({ primaryColor, secondaryColor }: MandalaBorderProps) {
  // Mandala corner component
  const MandalaCorner = ({ rotate = 0 }: { rotate?: number }) => (
    <svg viewBox="0 0 120 120" className="w-28 h-28" style={{ transform: `rotate(${rotate}deg)` }}>
      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="25"
          rx="8"
          ry="20"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.5"
          opacity="0.6"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}

      {/* Inner petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="35"
          rx="5"
          ry="12"
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.5"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}

      {/* Center circles */}
      <circle cx="60" cy="60" r="18" fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.7" />
      <circle cx="60" cy="60" r="12" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="6" fill={secondaryColor} opacity="0.6" />

      {/* Decorative dots around center */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={angle}
          cx="60"
          cy="45"
          r="2"
          fill={primaryColor}
          opacity="0.5"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main border */}
      <div
        className="absolute inset-0 border-[3px]"
        style={{ borderColor: primaryColor }}
      />

      {/* Inner decorative border */}
      <div
        className="absolute border-[1px]"
        style={{
          borderColor: primaryColor,
          top: '8px',
          left: '8px',
          right: '8px',
          bottom: '8px',
          opacity: 0.5,
        }}
      />

      {/* Connecting lines between corners */}
      {/* Top line */}
      <svg className="absolute top-3 left-28 right-28 h-6" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="100%" y2="12" stroke={primaryColor} strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
        <line x1="0" y1="16" x2="100%" y2="16" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Bottom line */}
      <svg className="absolute bottom-3 left-28 right-28 h-6" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="100%" y2="12" stroke={primaryColor} strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
        <line x1="0" y1="8" x2="100%" y2="8" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Left line */}
      <svg className="absolute left-3 top-28 bottom-28 w-6" preserveAspectRatio="none">
        <line x1="12" y1="0" x2="12" y2="100%" stroke={primaryColor} strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
        <line x1="16" y1="0" x2="16" y2="100%" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Right line */}
      <svg className="absolute right-3 top-28 bottom-28 w-6" preserveAspectRatio="none">
        <line x1="12" y1="0" x2="12" y2="100%" stroke={primaryColor} strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
        <line x1="8" y1="0" x2="8" y2="100%" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Small decorative elements along edges */}
      {/* Top edge diamonds */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 40 20" className="w-10 h-5">
          <path d="M20 2 L30 10 L20 18 L10 10 Z" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="10" r="2" fill={secondaryColor} opacity="0.6" />
        </svg>
      </div>

      {/* Bottom edge diamonds */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 40 20" className="w-10 h-5">
          <path d="M20 2 L30 10 L20 18 L10 10 Z" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="10" r="2" fill={secondaryColor} opacity="0.6" />
        </svg>
      </div>

      {/* Corner Mandalas */}
      <div className="absolute -top-2 -left-2">
        <MandalaCorner rotate={0} />
      </div>
      <div className="absolute -top-2 -right-2">
        <MandalaCorner rotate={90} />
      </div>
      <div className="absolute -bottom-2 -left-2">
        <MandalaCorner rotate={270} />
      </div>
      <div className="absolute -bottom-2 -right-2">
        <MandalaCorner rotate={180} />
      </div>
    </div>
  );
}
