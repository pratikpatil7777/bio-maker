import type { Metadata } from "next";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AlertProvider } from "@/components/AlertDialog";

export const metadata: Metadata = {
  title: "Shubh Vivah - Marriage Biodata Builder",
  description: "Create beautiful marriage biodata with customizable themes, borders, and layouts. Export as PDF. शुभ विवाह - विवाह बायोडाटा बिल्डर",
  keywords: ["marriage biodata", "biodata maker", "biodata builder", "matrimony", "wedding biodata", "shubh vivah", "शुभ विवाह", "विवाह बायोडाटा"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Shubh Vivah - Marriage Biodata Builder",
    description: "Create beautiful marriage biodata with customizable themes, borders, and layouts. Export as PDF.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Shubh Vivah Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shubh Vivah - Marriage Biodata Builder",
    description: "Create beautiful marriage biodata with customizable themes, borders, and layouts.",
    images: ["/logo.png"],
  },
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
