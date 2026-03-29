/**
 * Dynamic OG Image Generator
 *
 * INTERVIEW CONCEPTS:
 * 1. What is an OG Image?
 *    - Open Graph image shown when sharing on social media
 *    - Facebook, Twitter, LinkedIn, WhatsApp all use it
 *    - Standard size: 1200x630 pixels
 *
 * 2. Why dynamic generation?
 *    - No need to manually create images
 *    - Can include dynamic content
 *    - Cached at edge for performance
 *
 * 3. Next.js ImageResponse:
 *    - Uses Vercel's @vercel/og under the hood
 *    - Generates PNG at the edge
 *    - Supports JSX styling
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
          background: 'linear-gradient(135deg, #FFFEF0 0%, #FFF8E1 50%, #FFFEF0 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '3px solid #D4AF37',
            borderRadius: 16,
            display: 'flex',
          }}
        />

        {/* Inner decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            border: '1px solid #D4AF37',
            borderRadius: 12,
            display: 'flex',
          }}
        />

        {/* Om symbol */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 10,
            display: 'flex',
          }}
        >
          🙏
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#B8860B',
            marginBottom: 16,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Bio Maker
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#8B7355',
            marginBottom: 24,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Free Marriage Biodata Creator
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 20,
          }}
        >
          {['Hindi', 'Marathi', 'English'].map((lang) => (
            <div
              key={lang}
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: 30,
                fontSize: 24,
                fontWeight: 'bold',
                display: 'flex',
              }}
            >
              {lang}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 28,
            color: '#666',
            display: 'flex',
          }}
        >
          100% Free • No Signup • Beautiful Templates
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

/**
 * INTERVIEW Q&A:
 *
 * Q: Why not just use a static image?
 * A: Dynamic images can be personalized, A/B tested, and
 *    automatically updated without rebuilding.
 *
 * Q: How does caching work?
 * A: Vercel caches at CDN edge. Add revalidation for dynamic content:
 *    export const revalidate = 86400; // 24 hours
 *
 * Q: Can you pass parameters?
 * A: Yes! Use searchParams to customize:
 *    /opengraph-image?title=Custom%20Title
 */
