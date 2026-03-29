/**
 * Referral & Attribution Tracking System
 *
 * INTERVIEW CONCEPTS:
 *
 * 1. ATTRIBUTION MODELS:
 *    - First-touch: Credit first interaction (we use this)
 *    - Last-touch: Credit last interaction before conversion
 *    - Multi-touch: Distribute credit across touchpoints
 *
 * 2. UTM PARAMETERS:
 *    utm_source   → Where traffic came from (whatsapp, google, facebook)
 *    utm_medium   → Marketing medium (referral, cpc, organic, social)
 *    utm_campaign → Campaign name (family_share, launch_2024)
 *    utm_content  → A/B test variant (button_red, button_blue)
 *    utm_term     → Paid search keywords
 *
 * 3. REFERRAL CODES:
 *    ?ref=ABC123  → Simple referral tracking
 *    Can be tied to user accounts for rewards (future feature)
 *
 * 4. WHY THIS MATTERS FOR PMF:
 *    - Know which channels bring users
 *    - Measure viral coefficient
 *    - Optimize marketing spend
 */

// Types for attribution data
export interface AttributionData {
  source: string;      // utm_source or 'direct'
  medium: string;      // utm_medium or 'none'
  campaign: string;    // utm_campaign or 'none'
  content: string;     // utm_content (for A/B tests)
  term: string;        // utm_term (paid keywords)
  referralCode: string; // ref parameter
  landingPage: string; // First page visited
  timestamp: string;   // When they landed
  referrer: string;    // document.referrer
}

// Storage keys
const ATTRIBUTION_KEY = 'bio_maker_attribution';
const REFERRAL_KEY = 'bio_maker_referral';

/**
 * Parse URL parameters and store attribution data
 * Called once on first page load
 */
export function captureAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;

  // Check if we already have attribution (first-touch model)
  const existing = getStoredAttribution();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);

  const attribution: AttributionData = {
    source: params.get('utm_source') || inferSource(),
    medium: params.get('utm_medium') || inferMedium(),
    campaign: params.get('utm_campaign') || 'none',
    content: params.get('utm_content') || 'none',
    term: params.get('utm_term') || 'none',
    referralCode: params.get('ref') || 'none',
    landingPage: window.location.pathname,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
  };

  // Store attribution
  try {
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));

    // Also store referral code separately for easy access
    if (attribution.referralCode !== 'none') {
      localStorage.setItem(REFERRAL_KEY, attribution.referralCode);
    }
  } catch {
    // localStorage might be disabled
  }

  return attribution;
}

/**
 * Infer source from referrer URL
 * Interview: This is called "referrer parsing"
 */
function inferSource(): string {
  if (typeof document === 'undefined') return 'direct';

  const referrer = document.referrer;
  if (!referrer) return 'direct';

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    // Common sources
    if (host.includes('google')) return 'google';
    if (host.includes('facebook') || host.includes('fb.')) return 'facebook';
    if (host.includes('instagram')) return 'instagram';
    if (host.includes('twitter') || host.includes('t.co')) return 'twitter';
    if (host.includes('linkedin')) return 'linkedin';
    if (host.includes('youtube')) return 'youtube';
    if (host.includes('whatsapp') || host.includes('wa.me')) return 'whatsapp';

    // Return domain for unknown sources
    return host.replace('www.', '');
  } catch {
    return 'unknown';
  }
}

/**
 * Infer medium from referrer
 */
function inferMedium(): string {
  if (typeof document === 'undefined') return 'none';

  const referrer = document.referrer;
  if (!referrer) return 'none';

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    // Social media
    if (['facebook', 'instagram', 'twitter', 'linkedin', 'pinterest'].some(s => host.includes(s))) {
      return 'social';
    }

    // Search engines
    if (['google', 'bing', 'yahoo', 'duckduckgo', 'baidu'].some(s => host.includes(s))) {
      return 'organic';
    }

    // Messaging apps
    if (['whatsapp', 'telegram', 'messenger'].some(s => host.includes(s))) {
      return 'referral';
    }

    return 'referral';
  } catch {
    return 'unknown';
  }
}

/**
 * Get stored attribution data
 */
export function getStoredAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(ATTRIBUTION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Get referral code if user came via referral
 */
export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(REFERRAL_KEY);
  } catch {
    return null;
  }
}

/**
 * Generate a shareable referral link
 *
 * Interview Q: Why simple codes instead of UUIDs?
 * A: Easier to type/remember, fits in SMS, looks cleaner
 */
export function generateReferralLink(source: 'whatsapp' | 'copy' | 'family' = 'copy'): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://bio-maker-in.vercel.app';

  // Generate simple referral code (could be user ID in future)
  const refCode = generateRefCode();

  // Add UTM parameters for tracking
  const params = new URLSearchParams({
    utm_source: source === 'whatsapp' ? 'whatsapp' : 'share_link',
    utm_medium: 'referral',
    utm_campaign: source === 'family' ? 'family_share' : 'user_share',
    ref: refCode,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate a simple referral code
 * Format: 6 characters (uppercase letters + numbers)
 */
function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars (0, O, 1, I)
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Pre-built share messages with UTM tracking
 *
 * Interview: "Share copy" is a critical growth lever
 */
export const ShareMessages = {
  whatsapp: {
    en: (link: string) =>
      `🙏 Namaste!\n\nI created my marriage biodata using Bio Maker - it's FREE and beautiful!\n\nTry it: ${link}`,
    hi: (link: string) =>
      `🙏 नमस्ते!\n\nमैंने Bio Maker से अपना विवाह बायोडाटा बनाया - मुफ्त और सुंदर!\n\nआप भी बनाएं: ${link}`,
    mr: (link: string) =>
      `🙏 नमस्कार!\n\nमी Bio Maker वापरून माझा विवाह बायोडाटा बनवला - मोफत आणि सुंदर!\n\nतुम्हीही बनवा: ${link}`,
  },

  family: {
    en: (link: string) =>
      `Hi! I made my biodata online - now you can make yours too!\n\nIt's free and takes 5 minutes: ${link}`,
    hi: (link: string) =>
      `मैंने अपना बायोडाटा ऑनलाइन बनाया - अब आप भी बनाएं!\n\nमुफ्त है, 5 मिनट में बन जाएगा: ${link}`,
    mr: (link: string) =>
      `मी माझा बायोडाटा ऑनलाइन बनवला - आता तुम्हीही बनवा!\n\nमोफत आहे, 5 मिनिटात होईल: ${link}`,
  },
};

/**
 * Track referral events
 * Links to analytics.ts
 */
export function trackReferralEvent(event: 'link_generated' | 'link_shared' | 'referral_converted'): void {
  // This would integrate with analytics
  // For now, store locally for future dashboard
  if (typeof window === 'undefined') return;

  try {
    const events = JSON.parse(localStorage.getItem('bio_maker_ref_events') || '[]');
    events.push({
      event,
      timestamp: new Date().toISOString(),
      referralCode: getReferralCode(),
    });
    localStorage.setItem('bio_maker_ref_events', JSON.stringify(events.slice(-100))); // Keep last 100
  } catch {
    // Ignore storage errors
  }
}

/**
 * INTERVIEW DEEP DIVE: Growth Metrics
 *
 * Q: How would you measure viral growth?
 * A: Track these metrics:
 *    1. K-factor = invites_sent × conversion_rate
 *    2. Viral cycle time = time from signup to referral
 *    3. Referral participation rate = users who share / total users
 *
 * Q: How would you improve K-factor?
 * A: 1. Make sharing easier (one-tap WhatsApp)
 *    2. Improve share copy (social proof, urgency)
 *    3. Add incentives (premium features for referrals)
 *    4. Time the ask (after positive experience)
 *
 * Q: What's the difference between paid and organic acquisition?
 * A: Paid: Google Ads, Facebook Ads (CAC = spend / new users)
 *    Organic: SEO, referrals, word of mouth (free but slow)
 *    Viral: Each user brings more users (exponential if K > 1)
 */
