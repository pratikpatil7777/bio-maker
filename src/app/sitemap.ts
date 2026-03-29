/**
 * Dynamic Sitemap Generator for Bio Maker
 *
 * INTERVIEW CONCEPTS:
 * 1. Why sitemaps matter:
 *    - Helps search engines discover all pages
 *    - Provides metadata (last modified, priority)
 *    - Essential for SEO
 *
 * 2. Next.js App Router generates sitemap.xml automatically
 *    from this file at build time (SSG) or on request (dynamic)
 *
 * 3. Priority values (0.0 to 1.0):
 *    - 1.0: Homepage (most important)
 *    - 0.8: Main features
 *    - 0.5: Secondary pages
 *    - 0.3: Legal/support pages
 *
 * 4. changeFrequency options:
 *    - always, hourly, daily, weekly, monthly, yearly, never
 */

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bio-maker-in.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/app`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Main app - high priority
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/examples`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Language variants for main pages (helps with international SEO)
  // Interview: hreflang tells Google about language alternatives
  const languages = ['hi', 'mr'];
  const languagePages: MetadataRoute.Sitemap = languages.flatMap(lang => [
    {
      url: `${BASE_URL}?lang=${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/app?lang=${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...languagePages];
}

/**
 * INTERVIEW Q&A:
 *
 * Q: Static vs Dynamic sitemap?
 * A: Static: Generated at build time, good for fixed pages
 *    Dynamic: Generated on request, good for user-generated content
 *    We use static since our pages don't change often.
 *
 * Q: How does Google find the sitemap?
 * A: 1. robots.txt points to it
 *    2. Submit manually in Google Search Console
 *    3. Google discovers /sitemap.xml automatically
 *
 * Q: What's the difference between sitemap.xml and sitemap index?
 * A: Index is for large sites with multiple sitemaps (50k+ URLs each)
 *    We don't need it for a small site.
 */
