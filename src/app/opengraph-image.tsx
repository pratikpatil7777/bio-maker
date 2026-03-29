/**
 * Dynamic OG Image Generator - Premium Design
 *
 * Design Goals:
 * - Bold, readable at small sizes (WhatsApp thumbnail)
 * - Cultural connection (traditional Indian aesthetic)
 * - Clear value proposition
 * - Memorable and professional
 */

import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          background: '#FFFDF5',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Left side - Golden accent panel */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 400,
            background: 'linear-gradient(180deg, #C9A227 0%, #8B6914 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}
        >
          {/* Decorative pattern - top */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: 30,
              right: 30,
              height: 60,
              borderTop: '2px solid rgba(255,255,255,0.3)',
              borderLeft: '2px solid rgba(255,255,255,0.3)',
              borderRight: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
            }}
          />

          {/* Decorative pattern - bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: 30,
              right: 30,
              height: 60,
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              borderLeft: '2px solid rgba(255,255,255,0.3)',
              borderRight: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
            }}
          />

          {/* Shubh Vivah in Devanagari - Cultural touch */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: 16,
              letterSpacing: 4,
              display: 'flex',
            }}
          >
            शुभ विवाह
          </div>

          {/* Main Logo Text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            <span>Bio</span>
            <span>Maker</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 20,
              fontSize: 18,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              display: 'flex',
              letterSpacing: 2,
            }}
          >
            SINCE 2024
          </div>
        </div>

        {/* Right side - Content */}
        <div
          style={{
            position: 'absolute',
            left: 400,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '50px 60px',
            background: '#FFFDF5',
          }}
        >
          {/* Decorative corner */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              width: 80,
              height: 80,
              borderTop: '3px solid #C9A227',
              borderRight: '3px solid #C9A227',
              borderRadius: '0 12px 0 0',
              display: 'flex',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              width: 80,
              height: 80,
              borderBottom: '3px solid #C9A227',
              borderRight: '3px solid #C9A227',
              borderRadius: '0 0 12px 0',
              display: 'flex',
            }}
          />

          {/* Main headline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.2,
              marginBottom: 24,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Create Beautiful</span>
            <span style={{ color: '#8B6914' }}>Marriage Biodata</span>
          </div>

          {/* Sub headline */}
          <div
            style={{
              fontSize: 26,
              color: '#555',
              marginBottom: 36,
              display: 'flex',
            }}
          >
            Professional templates in seconds
          </div>

          {/* Features row */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {[
              { label: 'FREE', desc: 'Forever' },
              { label: 'NO', desc: 'Signup' },
              { label: '3', desc: 'Languages' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 28px',
                  background: '#FFF9E6',
                  borderRadius: 12,
                  border: '1px solid #E8D9A0',
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: '#8B6914',
                    display: 'flex',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: '#666',
                    display: 'flex',
                  }}
                >
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Language bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #C9A227 0%, #A68B1E 100%)',
                borderRadius: 30,
                color: 'white',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              <span>English</span>
              <span style={{ opacity: 0.6 }}>|</span>
              <span>हिंदी</span>
              <span style={{ opacity: 0.6 }}>|</span>
              <span>मराठी</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
