import type { Metadata } from "next";
import { Playfair_Display, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steeve Donald Compaore — Portfolio",
  description:
    "Builder, AI Engineer & Product Designer from Burkina Faso. Building Africa's tech future.",
  keywords: [
    "Steeve Donald Compaore",
    "Portfolio",
    "AI Engineer",
    "Next.js",
    "Africa Tech",
    "Burkina Faso",
  ],
  authors: [{ name: "Steeve Donald Compaore", url: "https://github.com/dosteeve2-hash" }],
  openGraph: {
    title: "Steeve Donald Compaore — Portfolio",
    description: "Builder. AI Engineer. Product Designer. Building Africa's tech future.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Steeve Donald Compaore — Portfolio",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
