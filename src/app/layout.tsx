import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AlertProvider } from "@/components/AlertDialog";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { AttributionTracker } from "@/components/AttributionTracker";

// Fonts are loaded via @import in globals.css
// Using CSS @import for better Turbopack compatibility

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bio-maker-in.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Marriage Biodata Maker Online | Create PDF Biodata in Hindi, Marathi, English",
    template: "%s | Bio Maker - Free Biodata Creator",
  },
  description: "Create beautiful marriage biodata online FREE. No signup needed. Professional templates with traditional borders. Download as PDF. Available in Hindi (हिंदी), Marathi (मराठी) & English. Trusted by families across India for shaadi biodata.",
  keywords: [
    // Primary English keywords
    "marriage biodata",
    "marriage biodata format",
    "biodata for marriage",
    "marriage biodata maker",
    "biodata maker online free",
    "marriage biodata format pdf",
    "biodata format for marriage",
    "free biodata maker",
    "biodata creator",
    "wedding biodata",
    "matrimony biodata",
    "biodata template",
    "shaadi biodata",
    "biodata for shaadi",
    // Hindi keywords (high search volume)
    "शादी का बायोडाटा",
    "विवाह बायोडाटा",
    "बायोडाटा फॉर्मेट",
    "शादी के लिए बायोडाटा",
    "बायोडाटा मेकर",
    "हिंदी बायोडाटा",
    "बायोडाटा कैसे बनाएं",
    // Marathi keywords
    "लग्न बायोडाटा",
    "विवाह बायोडाटा मराठी",
    "बायोडाटा नमुना",
    "मराठी बायोडाटा",
    "लग्नासाठी बायोडाटा",
    // Long-tail keywords
    "how to make biodata for marriage",
    "marriage biodata format in word",
    "simple biodata format for marriage",
    "biodata format for marriage pdf free download",
    "hindu marriage biodata format",
  ],
  authors: [{ name: "Bio Maker Team" }],
  creator: "Bio Maker",
  publisher: "Bio Maker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Free Marriage Biodata Maker | Create Beautiful Biodata in Minutes",
    description: "Create stunning marriage biodata online for FREE. Professional templates, traditional borders, Hindi/Marathi/English. No signup. Download PDF instantly.",
    url: siteUrl,
    siteName: "Bio Maker - Marriage Biodata Creator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bio Maker - Free Marriage Biodata Maker with Beautiful Templates",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Bio Maker Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Maker Online",
    description: "Create beautiful marriage biodata in Hindi, Marathi & English. 100% free, no signup. Download PDF instantly.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
      "hi-IN": `${siteUrl}?lang=hi`,
      "mr-IN": `${siteUrl}?lang=mr`,
    },
  },
  category: "lifestyle",
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    "application-name": "Bio Maker",
    "apple-mobile-web-app-title": "Bio Maker",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFEF0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data for Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      "name": "Bio Maker - Marriage Biodata Creator",
      "description": "Create beautiful marriage biodata online for free. Professional templates in Hindi, Marathi & English.",
      "url": siteUrl,
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "featureList": [
        "Create marriage biodata online",
        "Multiple professional templates",
        "Traditional Indian borders",
        "Hindi, Marathi, English support",
        "Download as PDF",
        "No signup required",
        "100% free forever"
      ],
      "screenshot": `${siteUrl}/og-image.png`,
      "softwareVersion": "1.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "6",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Bio Maker",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "width": 512,
        "height": 512
      },
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Bio Maker",
      "description": "Free online marriage biodata maker",
      "publisher": {
        "@id": `${siteUrl}/#organization`
      },
      "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Bio Maker really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Bio Maker is 100% free forever. You can create unlimited biodatas, use all templates, and download PDFs without any payment or signup."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No signup or account is required. Your data stays in your browser and is never uploaded to any server."
          }
        },
        {
          "@type": "Question",
          "name": "Can I create biodata in Hindi or Marathi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Bio Maker supports English, Hindi (हिंदी), and Marathi (मराठी). You can switch languages anytime."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data private and secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All your biodata information stays on your device. We never see, store, or upload your personal information."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Create Marriage Biodata Online",
      "description": "Step-by-step guide to create a beautiful marriage biodata using Bio Maker",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Choose Your Style",
          "text": "Select from beautiful themes and traditional Indian borders"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Add Your Details",
          "text": "Fill in personal, family, education and career information"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Download & Share",
          "text": "Export as print-ready PDF or share directly via WhatsApp"
        }
      ],
      "totalTime": "PT5M"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <DarkModeProvider>
          <AlertProvider>
            {/* Suspense needed for useSearchParams in AnalyticsProvider */}
            <Suspense fallback={null}>
              <AnalyticsProvider>
                <AttributionTracker />
                {children}
              </AnalyticsProvider>
            </Suspense>
          </AlertProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
