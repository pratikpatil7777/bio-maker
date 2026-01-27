import type { Metadata } from "next";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AlertProvider } from "@/components/AlertDialog";

export const metadata: Metadata = {
  title: "Marriage Biodata Builder",
  description: "Create beautiful marriage biodata with customizable themes, borders, and layouts. Export as PDF.",
  keywords: ["marriage biodata", "biodata maker", "biodata builder", "matrimony", "wedding biodata"],
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
