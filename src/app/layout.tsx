import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AlertProvider } from "@/components/AlertDialog";

// Fonts are loaded via @import in globals.css
// Using CSS @import for better Turbopack compatibility

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://biomaker.app'),
  title: {
    default: "Bio Maker - Create Beautiful Marriage Biodatas",
    template: "%s | Bio Maker",
  },
  description: "Create stunning marriage biodatas in minutes. Professional themes, traditional borders, multiple languages (English, Hindi, Marathi). 100% free, no signup required. Export as PDF.",
  keywords: [
    "marriage biodata",
    "biodata maker",
    "biodata builder",
    "biodata creator",
    "matrimony biodata",
    "wedding biodata",
    "biodata template",
    "free biodata maker",
    "विवाह बायोडाटा",
    "बायोडाटा मेकर",
    "लग्न बायोडाटा",
  ],
  authors: [{ name: "Bio Maker" }],
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
    title: "Bio Maker - Create Beautiful Marriage Biodatas",
    description: "Create stunning marriage biodatas in minutes. Professional themes, traditional borders, multiple languages. 100% free.",
    url: "https://biomaker.app",
    siteName: "Bio Maker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bio Maker - Marriage Biodata Creator",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Bio Maker Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio Maker - Create Beautiful Marriage Biodatas",
    description: "Create stunning marriage biodatas in minutes. 100% free, no signup required.",
    images: ["/og-image.png"],
    creator: "@biomaker",
  },
  alternates: {
    canonical: "https://biomaker.app",
    languages: {
      "en-US": "https://biomaker.app",
      "hi-IN": "https://biomaker.app?lang=hi",
      "mr-IN": "https://biomaker.app?lang=mr",
    },
  },
  category: "technology",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <DarkModeProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
