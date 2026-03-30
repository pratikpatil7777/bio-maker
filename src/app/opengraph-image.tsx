/**
 * Dynamic OG Image Generator - Premium Design v3
 *
 * Design Goals:
 * - Bold, readable at small sizes (WhatsApp thumbnail)
 * - Highlight AI as key differentiator
 * - Clear value proposition
 * - Professional and memorable
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
        {/* Left side - Golden brand panel */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 380,
            background: 'linear-gradient(180deg, #D4AF37 0%, #996515 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}
        >
          {/* Decorative frame - top */}
          <div
            style={{
              position: 'absolute',
              top: 25,
              left: 25,
              right: 25,
              height: 50,
              borderTop: '2px solid rgba(255,255,255,0.4)',
              borderLeft: '2px solid rgba(255,255,255,0.4)',
              borderRight: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
            }}
          />

          {/* Decorative frame - bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 25,
              left: 25,
              right: 25,
              height: 50,
              borderBottom: '2px solid rgba(255,255,255,0.4)',
              borderLeft: '2px solid rgba(255,255,255,0.4)',
              borderRight: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
            }}
          />

          {/* Main Logo */}
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textShadow: '0 3px 12px rgba(0,0,0,0.2)',
              lineHeight: 1.1,
            }}
          >
            <span>Bio</span>
            <span>Maker</span>
          </div>

          {/* Website URL - brand recall */}
          <div
            style={{
              marginTop: 24,
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              display: 'flex',
              letterSpacing: 1,
              padding: '8px 20px',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 20,
            }}
          >
            biomaker.in
          </div>
        </div>

        {/* Right side - Content */}
        <div
          style={{
            position: 'absolute',
            left: 380,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 50px',
            background: '#FFFDF5',
          }}
        >
          {/* Decorative corners */}
          <div
            style={{
              position: 'absolute',
              top: 25,
              right: 25,
              width: 70,
              height: 70,
              borderTop: '3px solid #D4AF37',
              borderRight: '3px solid #D4AF37',
              borderRadius: '0 10px 0 0',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 25,
              right: 25,
              width: 70,
              height: 70,
              borderBottom: '3px solid #D4AF37',
              borderRight: '3px solid #D4AF37',
              borderRadius: '0 0 10px 0',
              display: 'flex',
            }}
          />

          {/* AI Badge - Key differentiator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
              borderRadius: 20,
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ color: 'white', fontSize: 16, fontWeight: 700, display: 'flex' }}>
              AI-Powered
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.15,
              marginBottom: 16,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Create Beautiful</span>
            <span style={{ color: '#996515' }}>Marriage Biodata</span>
          </div>

          {/* Sub headline */}
          <div
            style={{
              fontSize: 24,
              color: '#555',
              marginBottom: 32,
              display: 'flex',
            }}
          >
            Professional biodatas in minutes, not hours
          </div>

          {/* USP boxes */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              { label: 'FREE', desc: 'Forever' },
              { label: 'AI', desc: 'Bio Writer' },
              { label: 'NO', desc: 'Signup' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '14px 24px',
                  background: item.label === 'AI' ? '#F3E8FF' : '#FFF9E6',
                  borderRadius: 12,
                  border: item.label === 'AI' ? '2px solid #7C3AED' : '1px solid #E8D9A0',
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: item.label === 'AI' ? '#7C3AED' : '#996515',
                    display: 'flex',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: 14,
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
              gap: 12,
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #996515 100%)',
              borderRadius: 25,
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ display: 'flex' }}>English</span>
            <span style={{ opacity: 0.5, display: 'flex' }}>|</span>
            <span style={{ display: 'flex' }}>हिंदी</span>
            <span style={{ opacity: 0.5, display: 'flex' }}>|</span>
            <span style={{ display: 'flex' }}>मराठी</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
