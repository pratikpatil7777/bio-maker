'use client';

/**
 * Attribution Tracker Component
 *
 * INTERVIEW CONCEPT: Attribution Tracking
 *
 * This component runs once on app load to:
 * 1. Capture UTM parameters from URL
 * 2. Store attribution data for conversion tracking
 * 3. Track referral source for viral metrics
 *
 * Why a component?
 * - Needs to run client-side (access to window/localStorage)
 * - Should run once, early in app lifecycle
 * - Doesn't render anything (null return)
 */

import { useEffect } from 'react';
import { captureAttribution, getReferralCode, trackReferralEvent } from '@/lib/referral';
import { AnalyticsEvents } from '@/lib/analytics';

export function AttributionTracker() {
  useEffect(() => {
    // Capture attribution on first load
    const attribution = captureAttribution();

    // If this is a referred user, track the event
    const refCode = getReferralCode();
    if (refCode) {
      trackReferralEvent('referral_converted');

      // Also send to analytics
      AnalyticsEvents.CAMPAIGN_LANDED({
        source: attribution?.source,
        medium: attribution?.medium,
        campaign: attribution?.campaign,
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * INTERVIEW Q&A:
 *
 * Q: Why use useEffect instead of running in component body?
 * A: useEffect ensures code runs after hydration,
 *    avoiding SSR/client mismatch errors.
 *
 * Q: Why capture attribution immediately?
 * A: Users might navigate away from landing page.
 *    We want to capture before they bounce.
 *
 * Q: How would you handle ad blockers?
 * A: localStorage usually works even with ad blockers.
 *    Server-side attribution (via cookies) is more reliable.
 */
