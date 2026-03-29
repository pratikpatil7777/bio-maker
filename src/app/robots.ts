/**
 * Dynamic robots.txt generator
 *
 * INTERVIEW CONCEPT:
 * Next.js can generate robots.txt dynamically using this file.
 * This takes precedence over public/robots.txt
 *
 * Benefits:
 * - Can use environment variables (different rules for staging vs prod)
 * - Type-safe configuration
 * - Automatically generates proper format
 */

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bio-maker-in.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/app/share'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

/**
 * INTERVIEW NOTE:
 * Having both public/robots.txt AND app/robots.ts is redundant.
 * The app/robots.ts takes precedence.
 * We keep public/robots.txt as a fallback/documentation.
 */
