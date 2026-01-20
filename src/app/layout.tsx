import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratik Ravindra Patil - Marriage Biodata",
  description: "Marriage Biodata of Pratik Ravindra Patil - Full Stack Developer based in New York City, USA",
  keywords: ["marriage biodata", "Pratik Patil", "biodata", "matrimony"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
