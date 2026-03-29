/**
 * Dynamic OG Image Generator
 *
 * Design Principles:
 * - Clean, professional look (no emojis)
 * - Consistent language order: English, Hindi, Marathi
 * - Traditional Indian aesthetic with modern design
 * - Clear value proposition
 */

import { ImageResponse } from 'next/og';

// Image dimensions (standard OG size)
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Generate OG image
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #FFFEF5 0%, #FFF9E6 50%, #FFFEF5 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Outer decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '3px solid #C5A028',
            borderRadius: 20,
            display: 'flex',
          }}
        />

        {/* Inner decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: '1px solid #D4AF37',
            borderRadius: 14,
            display: 'flex',
          }}
        />

        {/* Corner decorative elements - Top Left */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 44,
            width: 60,
            height: 60,
            borderTop: '2px solid #B8860B',
            borderLeft: '2px solid #B8860B',
            borderRadius: '8px 0 0 0',
            display: 'flex',
          }}
        />

        {/* Corner decorative elements - Top Right */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 44,
            width: 60,
            height: 60,
            borderTop: '2px solid #B8860B',
            borderRight: '2px solid #B8860B',
            borderRadius: '0 8px 0 0',
            display: 'flex',
          }}
        />

        {/* Corner decorative elements - Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: 44,
            width: 60,
            height: 60,
            borderBottom: '2px solid #B8860B',
            borderLeft: '2px solid #B8860B',
            borderRadius: '0 0 0 8px',
            display: 'flex',
          }}
        />

        {/* Corner decorative elements - Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 44,
            width: 60,
            height: 60,
            borderBottom: '2px solid #B8860B',
            borderRight: '2px solid #B8860B',
            borderRadius: '0 0 8px 0',
            display: 'flex',
          }}
        />

        {/* Decorative line above title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 80,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #C5A028)',
              display: 'flex',
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              background: '#C5A028',
              borderRadius: '50%',
              display: 'flex',
            }}
          />
          <div
            style={{
              width: 80,
              height: 2,
              background: 'linear-gradient(90deg, #C5A028, transparent)',
              display: 'flex',
            }}
          />
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            color: '#8B6914',
            marginBottom: 12,
            textAlign: 'center',
            display: 'flex',
            letterSpacing: '-1px',
          }}
        >
          Bio Maker
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 34,
            color: '#6B5A30',
            marginBottom: 40,
            textAlign: 'center',
            display: 'flex',
            fontWeight: 500,
          }}
        >
          Free Marriage Biodata Creator
        </div>

        {/* Language badges - Order: English, Hindi, Marathi */}
        <div
          style={{
            display: 'flex',
            gap: 24,
          }}
        >
          {['English', 'Hindi', 'Marathi'].map((lang, index) => (
            <div
              key={lang}
              style={{
                background: index === 0
                  ? 'linear-gradient(135deg, #C5A028 0%, #A68B1E 100%)'
                  : 'transparent',
                border: index === 0 ? 'none' : '2px solid #C5A028',
                color: index === 0 ? 'white' : '#8B6914',
                padding: '14px 36px',
                borderRadius: 40,
                fontSize: 22,
                fontWeight: 600,
                display: 'flex',
              }}
            >
              {lang}
            </div>
          ))}
        </div>

        {/* Bottom tagline with decorative elements */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: '#C5A028',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: '#8B7355',
              display: 'flex',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            100% Free
          </div>
          <div
            style={{
              width: 6,
              height: 6,
              background: '#C5A028',
              borderRadius: '50%',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: '#8B7355',
              display: 'flex',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            No Signup Required
          </div>
          <div
            style={{
              width: 6,
              height: 6,
              background: '#C5A028',
              borderRadius: '50%',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: '#8B7355',
              display: 'flex',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            Beautiful Templates
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: '#C5A028',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
