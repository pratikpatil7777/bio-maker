'use client';

/**
 * Analytics Provider Component
 *
 * INTERVIEW CONCEPTS:
 * 1. Script Loading Strategy:
 *    - 'afterInteractive': Load after page becomes interactive (default)
 *    - 'lazyOnload': Load during idle time (for non-critical scripts)
 *    - 'beforeInteractive': Load before page is interactive (critical)
 *
 * 2. Why use next/script instead of <script>?
 *    - Automatic optimization
 *    - Prevents duplicate loading
 *    - Better Core Web Vitals scores
 *
 * 3. Privacy Considerations:
 *    - GA4 is GDPR compliant (if configured correctly)
 *    - Clarity is GDPR compliant
 *    - We're not collecting PII (Personally Identifiable Information)
 */

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  trackPageView,
  parseUTMParams,
  AnalyticsEvents,
} from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  // Interview: This is needed for SPAs where page doesn't fully reload
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  // Parse and track UTM parameters on initial load
  useEffect(() => {
    const utmParams = parseUTMParams();
    if (Object.keys(utmParams).length > 0) {
      AnalyticsEvents.CAMPAIGN_LANDED(utmParams);
    }
  }, []);

  // Don't render scripts if no IDs configured
  // This allows the app to work without analytics in development
  if (!GA_MEASUREMENT_ID && !CLARITY_PROJECT_ID) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          {/*
            Interview Note: We load gtag.js with 'afterInteractive' strategy
            This means it loads after the page is interactive, not blocking render
          */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  // Enhanced measurement (auto-tracks scrolls, outbound clicks, etc.)
                  send_page_view: true,
                  // Anonymize IP for privacy (GDPR)
                  anonymize_ip: true,
                  // Link to Google Ads (if you run ads later)
                  allow_google_signals: true,
                  // Enable enhanced conversions
                  allow_ad_personalization_signals: false,
                });

                // Debug mode in development
                ${process.env.NODE_ENV === 'development' ? "gtag('config', '" + GA_MEASUREMENT_ID + "', { 'debug_mode': true });" : ''}
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity - Free Heatmaps & Session Recording */}
      {CLARITY_PROJECT_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}

      {children}
    </>
  );
}

/**
 * INTERVIEW DEEP DIVE: Why This Architecture?
 *
 * Q: Why use a Provider pattern for analytics?
 * A: 1. Single source of truth for script loading
 *    2. Can easily add/remove analytics tools
 *    3. Handles SPA page view tracking in one place
 *    4. Easy to disable for testing
 *
 * Q: What about cookie consent?
 * A: For India, DPDPA (Digital Personal Data Protection Act) requires:
 *    - Clear privacy policy (we have this)
 *    - Data minimization (we only track events, not PII)
 *    - For stricter compliance, add a consent banner before loading scripts
 *
 * Q: How would you A/B test with this?
 * A: 1. Use GA4's built-in experiments
 *    2. Or use a tool like Optimizely/VWO
 *    3. Or build custom: Store variant in localStorage, track in events
 *
 * Q: What metrics would you track for PMF?
 * A: 1. Activation: Form started → Form completed rate
 *    2. Retention: Same user downloads multiple biodatas (family feature)
 *    3. Referral: Share button clicks → New users from shared links
 *    4. Revenue: (future) Premium feature conversions
 */
