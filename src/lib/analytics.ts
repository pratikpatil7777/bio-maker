/**
 * Analytics Library for Bio Maker
 *
 * INTERVIEW CONCEPTS:
 * 1. GA4 is event-based (everything is an event)
 * 2. Events have parameters (key-value pairs)
 * 3. Conversions are events you mark as important
 * 4. User properties persist across sessions
 *
 * FREE TOOLS USED:
 * - Google Analytics 4 (GA4) - unlimited pageviews
 * - Microsoft Clarity - free heatmaps & session recordings
 */

// Types for type-safety (Interview: Always type your analytics!)
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  // GA4 custom parameters
  [key: string]: string | number | boolean | undefined;
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
    clarity: (command: string, ...args: unknown[]) => void;
  }
}

// GA4 Measurement ID - Replace with your actual ID
// You get this from: Google Analytics > Admin > Data Streams > Web
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Microsoft Clarity Project ID - Replace with your actual ID
// You get this from: clarity.microsoft.com > Settings > Overview
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';

/**
 * Check if analytics is available
 * Interview Q: Why check this?
 * A: Users might have ad blockers, or we're in development
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page views
 * Interview: GA4 tracks this automatically, but we call it manually
 * for SPA (Single Page App) navigation in Next.js
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!isAnalyticsAvailable()) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

/**
 * Track custom events
 *
 * Interview Concept: Event Naming Convention
 * - Use snake_case (GA4 standard)
 * - Be descriptive: 'biodata_downloaded' not 'download'
 * - Include context: { format: 'pdf', template: 'royal' }
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isAnalyticsAvailable()) return;

  const { action, category, label, value, ...customParams } = event;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParams,
  });
};

// ============================================
// PRE-DEFINED EVENTS FOR BIO MAKER
// Interview: Define your events upfront for consistency
// ============================================

/**
 * FUNNEL EVENTS
 * Interview Q: What is a conversion funnel?
 * A: The journey users take from landing to completing a goal
 *
 * Our funnel: Land → Start Form → Complete Form → Download PDF
 */
export const AnalyticsEvents = {
  // Acquisition Events
  LANDING_PAGE_VIEW: (source?: string) => trackEvent({
    action: 'landing_page_view',
    category: 'acquisition',
    label: source || 'direct',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  }),

  // Engagement Events
  FORM_STARTED: () => trackEvent({
    action: 'form_started',
    category: 'engagement',
    label: 'biodata_builder',
  }),

  SECTION_COMPLETED: (sectionName: string) => trackEvent({
    action: 'section_completed',
    category: 'engagement',
    label: sectionName,
  }),

  THEME_SELECTED: (themeName: string) => trackEvent({
    action: 'theme_selected',
    category: 'customization',
    label: themeName,
  }),

  BORDER_SELECTED: (borderName: string) => trackEvent({
    action: 'border_selected',
    category: 'customization',
    label: borderName,
  }),

  LANGUAGE_CHANGED: (language: string) => trackEvent({
    action: 'language_changed',
    category: 'customization',
    label: language,
  }),

  PHOTO_UPLOADED: () => trackEvent({
    action: 'photo_uploaded',
    category: 'engagement',
  }),

  PHOTO_CROPPED: () => trackEvent({
    action: 'photo_cropped',
    category: 'engagement',
  }),

  AI_BIO_GENERATED: (tone: string) => trackEvent({
    action: 'ai_bio_generated',
    category: 'ai_features',
    label: tone,
  }),

  AI_BIO_ERROR: (errorType: string) => trackEvent({
    action: 'ai_bio_error',
    category: 'errors',
    label: errorType,
  }),

  // CONVERSION EVENTS (Most Important!)
  // Interview: These are your key business metrics
  PDF_DOWNLOADED: (templateName?: string) => trackEvent({
    action: 'pdf_downloaded',
    category: 'conversion',
    label: templateName || 'default',
    value: 1, // Count conversions
  }),

  PNG_DOWNLOADED: () => trackEvent({
    action: 'png_downloaded',
    category: 'conversion',
  }),

  // Viral/Sharing Events
  SHARE_INITIATED: (method: 'whatsapp' | 'copy_link' | 'native' | 'email') => trackEvent({
    action: 'share_initiated',
    category: 'viral',
    label: method,
  }),

  SHARE_COMPLETED: (method: string) => trackEvent({
    action: 'share_completed',
    category: 'viral',
    label: method,
  }),

  REFERRAL_LINK_CREATED: () => trackEvent({
    action: 'referral_link_created',
    category: 'viral',
  }),

  CREATE_FOR_FAMILY_CLICKED: () => trackEvent({
    action: 'create_for_family',
    category: 'viral',
    label: 'post_download_modal',
  }),

  // Feedback Events
  FEEDBACK_SUBMITTED: (rating: number) => trackEvent({
    action: 'feedback_submitted',
    category: 'feedback',
    label: `${rating}_stars`,
    value: rating,
  }),

  // Error Tracking
  ERROR_OCCURRED: (errorType: string, errorMessage: string) => trackEvent({
    action: 'error_occurred',
    category: 'errors',
    label: errorType,
    error_message: errorMessage,
  }),

  // UTM Tracking (for campaigns)
  // Interview: UTM = Urchin Tracking Module (Google bought Urchin)
  CAMPAIGN_LANDED: (utmParams: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  }) => trackEvent({
    action: 'campaign_landed',
    category: 'acquisition',
    utm_source: utmParams.source || '',
    utm_medium: utmParams.medium || '',
    utm_campaign: utmParams.campaign || '',
    utm_term: utmParams.term || '',
    utm_content: utmParams.content || '',
  }),
};

/**
 * Parse UTM parameters from URL
 *
 * Interview Concept: UTM Parameters
 * - utm_source: Where traffic comes from (google, facebook, newsletter)
 * - utm_medium: Marketing medium (cpc, social, email)
 * - utm_campaign: Campaign name (summer_sale, launch_2024)
 * - utm_term: Paid keywords
 * - utm_content: A/B test variants
 *
 * Example URL: https://biomaker.in/?utm_source=whatsapp&utm_medium=referral&utm_campaign=family_share
 */
export const parseUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];

  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
      // Store in sessionStorage for attribution across pages
      sessionStorage.setItem(key, value);
    }
  });

  return utmParams;
};

/**
 * Get stored UTM params (persists across page navigation)
 */
export const getStoredUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  const utmParams: Record<string, string> = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];

  utmKeys.forEach(key => {
    const value = sessionStorage.getItem(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

/**
 * Set user properties (persist across sessions)
 * Interview: Use for segmentation - "users who prefer Hindi" etc.
 */
export const setUserProperty = (name: string, value: string): void => {
  if (!isAnalyticsAvailable()) return;

  window.gtag('set', 'user_properties', {
    [name]: value,
  });
};

/**
 * Track timing (for performance monitoring)
 * Interview: Important for Core Web Vitals
 */
export const trackTiming = (category: string, variable: string, timeMs: number): void => {
  if (!isAnalyticsAvailable()) return;

  window.gtag('event', 'timing_complete', {
    event_category: category,
    name: variable,
    value: Math.round(timeMs),
  });
};

/**
 * Microsoft Clarity helper
 * Interview: Clarity gives you FREE heatmaps and session recordings
 */
export const clarityEvent = (eventName: string): void => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('event', eventName);
  }
};

export const clarityIdentify = (userId: string, sessionId?: string): void => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('identify', userId, sessionId);
  }
};
