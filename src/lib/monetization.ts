/**
 * Monetization Strategy for Bio Maker
 *
 * INTERVIEW CONCEPTS:
 *
 * 1. PRICING PSYCHOLOGY:
 *    - Decoy effect: 3 tiers, middle one is "best value"
 *    - Anchoring: Show premium first to make basic seem cheap
 *    - Loss aversion: "Unlock features" vs "Pay to remove limits"
 *
 * 2. INDIAN MARKET CONSIDERATIONS:
 *    - Price sensitivity: Keep it affordable (₹99-299)
 *    - Payment methods: UPI, Razorpay, Paytm preferred
 *    - One-time vs subscription: Indians prefer one-time for tools
 *
 * 3. CONVERSION OPTIMIZATION:
 *    - Free trial of premium features
 *    - Show premium benefits at key moments
 *    - Reduce friction in payment flow
 *
 * 4. KEY METRICS:
 *    - Conversion rate: Free → Paid (target: 2-5%)
 *    - ARPU: Average Revenue Per User
 *    - LTV: Lifetime Value
 *    - CAC: Customer Acquisition Cost (LTV > 3x CAC is healthy)
 */

// Feature flags for premium features
export interface FeatureFlags {
  premiumTemplates: boolean;
  customBorders: boolean;
  noWatermark: boolean;
  priorityAI: boolean;
  unlimitedAI: boolean;
  cloudBackup: boolean;
  customFonts: boolean;
  exportFormats: boolean; // DOCX, PNG HD
}

// User subscription status
export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface UserSubscription {
  tier: SubscriptionTier;
  expiresAt: Date | null; // null = lifetime or free
  features: FeatureFlags;
}

// Default free tier features
const FREE_FEATURES: FeatureFlags = {
  premiumTemplates: false,
  customBorders: false,
  noWatermark: true, // We don't add watermarks (builds trust)
  priorityAI: false,
  unlimitedAI: false, // 50/day limit
  cloudBackup: false,
  customFonts: false,
  exportFormats: false,
};

// Premium tier features
const PREMIUM_FEATURES: FeatureFlags = {
  premiumTemplates: true,
  customBorders: true,
  noWatermark: true,
  priorityAI: true,
  unlimitedAI: true,
  cloudBackup: true,
  customFonts: true,
  exportFormats: true,
};

/**
 * Pricing Tiers
 *
 * Interview Q: Why these prices?
 * A: ₹99 is impulse buy territory in India
 *    ₹199 is "best value" sweet spot
 *    ₹499 is for serious users (family package)
 */
export const PRICING_TIERS = {
  free: {
    name: 'Free Forever',
    nameHi: 'हमेशा मुफ्त',
    nameMr: 'कायम मोफत',
    price: 0,
    priceDisplay: '₹0',
    features: [
      { en: '5 Beautiful Templates', hi: '5 सुंदर टेम्पलेट', mr: '5 सुंदर टेम्पलेट्स' },
      { en: 'Standard Borders', hi: 'स्टैंडर्ड बॉर्डर', mr: 'स्टँडर्ड बॉर्डर' },
      { en: 'PDF Download', hi: 'PDF डाउनलोड', mr: 'PDF डाउनलोड' },
      { en: '50 AI Bios/Day', hi: '50 AI बायो/दिन', mr: '50 AI बायो/दिवस' },
      { en: 'WhatsApp Sharing', hi: 'WhatsApp शेयरिंग', mr: 'WhatsApp शेअरिंग' },
    ],
    cta: { en: 'Current Plan', hi: 'वर्तमान प्लान', mr: 'सध्याचा प्लॅन' },
    highlighted: false,
  },

  basic: {
    name: 'Premium',
    nameHi: 'प्रीमियम',
    nameMr: 'प्रीमियम',
    price: 99,
    priceDisplay: '₹99',
    pricePeriod: { en: 'one-time', hi: 'एक बार', mr: 'एकदाच' },
    features: [
      { en: 'Everything in Free', hi: 'फ्री के सभी फीचर्स', mr: 'फ्री मधील सर्व' },
      { en: '15+ Premium Templates', hi: '15+ प्रीमियम टेम्पलेट', mr: '15+ प्रीमियम टेम्पलेट्स' },
      { en: 'Exclusive Borders', hi: 'एक्सक्लूसिव बॉर्डर', mr: 'एक्सक्लूसिव्ह बॉर्डर' },
      { en: 'HD PNG Export', hi: 'HD PNG एक्सपोर्ट', mr: 'HD PNG एक्सपोर्ट' },
      { en: 'Priority AI (Faster)', hi: 'प्रायोरिटी AI (तेज)', mr: 'प्रायोरिटी AI (जलद)' },
    ],
    cta: { en: 'Upgrade Now', hi: 'अभी अपग्रेड करें', mr: 'आता अपग्रेड करा' },
    highlighted: true, // This is the "recommended" tier
    badge: { en: 'Most Popular', hi: 'सबसे लोकप्रिय', mr: 'सर्वात लोकप्रिय' },
  },

  premium: {
    name: 'Family Pack',
    nameHi: 'फैमिली पैक',
    nameMr: 'फॅमिली पॅक',
    price: 299,
    priceDisplay: '₹299',
    pricePeriod: { en: 'one-time', hi: 'एक बार', mr: 'एकदाच' },
    features: [
      { en: 'Everything in Premium', hi: 'प्रीमियम के सभी फीचर्स', mr: 'प्रीमियम मधील सर्व' },
      { en: 'Create 5 Biodatas', hi: '5 बायोडाटा बनाएं', mr: '5 बायोडाटा बनवा' },
      { en: 'Cloud Backup', hi: 'क्लाउड बैकअप', mr: 'क्लाउड बॅकअप' },
      { en: 'Unlimited AI', hi: 'अनलिमिटेड AI', mr: 'अनलिमिटेड AI' },
      { en: 'Custom Fonts', hi: 'कस्टम फॉन्ट्स', mr: 'कस्टम फॉन्ट्स' },
      { en: 'Priority Support', hi: 'प्राथमिकता सपोर्ट', mr: 'प्राधान्य सपोर्ट' },
    ],
    cta: { en: 'Get Family Pack', hi: 'फैमिली पैक लें', mr: 'फॅमिली पॅक घ्या' },
    highlighted: false,
    badge: { en: 'Best Value', hi: 'बेस्ट वैल्यू', mr: 'बेस्ट व्हॅल्यू' },
  },
};

/**
 * Check if a feature is available for the user's tier
 */
export function isFeatureAvailable(
  feature: keyof FeatureFlags,
  tier: SubscriptionTier = 'free'
): boolean {
  switch (tier) {
    case 'premium':
      return PREMIUM_FEATURES[feature];
    case 'basic':
      // Basic has some premium features
      return ['premiumTemplates', 'customBorders', 'priorityAI', 'exportFormats'].includes(feature);
    case 'free':
    default:
      return FREE_FEATURES[feature];
  }
}

/**
 * Get user's current subscription (from localStorage for now)
 * In production, this would check against a database
 */
export function getCurrentSubscription(): UserSubscription {
  if (typeof window === 'undefined') {
    return { tier: 'free', expiresAt: null, features: FREE_FEATURES };
  }

  try {
    const stored = localStorage.getItem('bio_maker_subscription');
    if (stored) {
      const data = JSON.parse(stored);
      // Check if expired
      if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
        return { tier: 'free', expiresAt: null, features: FREE_FEATURES };
      }
      return data;
    }
  } catch {
    // Invalid data, return free
  }

  return { tier: 'free', expiresAt: null, features: FREE_FEATURES };
}

/**
 * Premium feature upsell points
 * Show these at strategic moments to drive conversion
 *
 * Interview: "Trigger points" are key to conversion
 */
export const UPSELL_TRIGGERS = {
  // When user tries to use a premium template
  premiumTemplate: {
    title: { en: 'Premium Template', hi: 'प्रीमियम टेम्पलेट', mr: 'प्रीमियम टेम्पलेट' },
    message: {
      en: 'This template is part of our Premium collection. Upgrade for just ₹99!',
      hi: 'यह टेम्पलेट प्रीमियम कलेक्शन में है। सिर्फ ₹99 में अपग्रेड करें!',
      mr: 'हा टेम्पलेट प्रीमियम कलेक्शनमध्ये आहे. फक्त ₹99 मध्ये अपग्रेड करा!',
    },
  },

  // When user hits AI limit
  aiLimit: {
    title: { en: 'Daily Limit Reached', hi: 'दैनिक सीमा समाप्त', mr: 'दैनिक मर्यादा संपली' },
    message: {
      en: 'You\'ve used all 50 free AI bios today. Upgrade for unlimited AI writing!',
      hi: 'आपने आज के 50 फ्री AI बायो इस्तेमाल कर लिए। अनलिमिटेड के लिए अपग्रेड करें!',
      mr: 'तुम्ही आजचे 50 मोफत AI बायो वापरले. अनलिमिटेडसाठी अपग्रेड करा!',
    },
  },

  // When user downloads PDF (soft upsell)
  afterDownload: {
    title: { en: 'Love Bio Maker?', hi: 'Bio Maker पसंद आया?', mr: 'Bio Maker आवडला?' },
    message: {
      en: 'Get premium templates and exclusive borders from just ₹99!',
      hi: 'प्रीमियम टेम्पलेट और एक्सक्लूसिव बॉर्डर सिर्फ ₹99 में!',
      mr: 'प्रीमियम टेम्पलेट आणि एक्सक्लूसिव्ह बॉर्डर फक्त ₹99 मध्ये!',
    },
  },
};

/**
 * Payment integration placeholder
 *
 * Interview: Razorpay is most common in India
 * - Supports UPI, cards, netbanking, wallets
 * - 2% transaction fee
 * - Easy integration
 */
export const PAYMENT_CONFIG = {
  provider: 'razorpay', // or 'stripe' for international
  currency: 'INR',
  // These would be environment variables in production
  // keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
};

/**
 * INTERVIEW Q&A:
 *
 * Q: Why one-time payment instead of subscription?
 * A: 1. Lower friction (Indians prefer ownership)
 *    2. Biodata is a one-time need (wedding planning)
 *    3. Lower churn risk
 *    4. Simpler to implement
 *
 * Q: How would you implement payment?
 * A: 1. Create order on server (API route)
 *    2. Open Razorpay checkout modal
 *    3. Verify payment signature on server
 *    4. Update user subscription in database
 *    5. Send confirmation email
 *
 * Q: How would you handle refunds?
 * A: 1. 7-day no-questions-asked refund policy
 *    2. Process via Razorpay dashboard
 *    3. Revoke premium access
 *    4. Track refund reasons for improvement
 *
 * Q: How would you prevent piracy/sharing?
 * A: 1. Tie license to device fingerprint
 *    2. Limit activations (3 devices)
 *    3. Keep it cheap so piracy isn't worth it
 *    4. Focus on convenience, not DRM
 */
