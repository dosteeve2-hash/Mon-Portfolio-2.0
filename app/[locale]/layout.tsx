import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import LenisProvider from "@/components/LenisProvider";
import ThemeScript from "@/components/ThemeScript";
import { LOCALES, SITE } from "@/lib/site";
import "../globals.css";

/*
 * Polices auto-hébergées — voir `app/polices/LICENCES.md`.
 *
 * `next/font/google` télécharge les fichiers PENDANT le build. Le 26/09/2026,
 * c'est ce qui a fait échouer le déploiement Vercel de la PR #13 :
 * `module-not-found` sur `[next]/internal/font/google/jetbrains_mono_*.module.css`.
 * La CI du dépôt était verte au même instant — un build qui dépend d'un service
 * tiers réussit ou échoue selon le réseau du jour, pas selon le code.
 *
 * Le même défaut avait fait tomber la CI de COMBINE le 23/09. Là-bas, la panne a
 * été reproduite en coupant `fonts.googleapis.com` : l'ancien code sort en 1, le
 * nouveau en 0. C'est ce correctif-là qui est porté ici.
 *
 * Ce sont des polices VARIABLES : un fichier couvre tout l'axe de graisse, d'où
 * `weight: "400 900"` plutôt qu'une liste. Quatre fichiers, 139 Ko.
 */
const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "../polices/playfair-display.woff2", weight: "400 900", style: "normal" },
    { path: "../polices/playfair-display-italic.woff2", weight: "400 900", style: "italic" },
  ],
  // Mesuré sur Georgia, la police à empattement la plus répandue : limite le
  // saut de mise en page pendant le `swap`.
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [{ path: "../polices/outfit.woff2", weight: "100 900", style: "normal" }],
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  src: [{ path: "../polices/jetbrains-mono.woff2", weight: "100 800", style: "normal" }],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const DESCRIPTIONS: Record<string, string> = {
  en: "Builder, AI Engineer & Product Designer from Burkina Faso. Web products, AI systems and industrial software, shipped for Africa.",
  fr: "Builder, ingénieur IA & product designer burkinabè. Produits web, systèmes IA et logiciels industriels, livrés pour l'Afrique.",
  tr: "Burkina Fasolu builder, yapay zekâ mühendisi ve ürün tasarımcısı. Afrika için web ürünleri, yapay zekâ sistemleri ve endüstriyel yazılımlar.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description = DESCRIPTIONS[locale] ?? DESCRIPTIONS.en;
  const title = `${SITE.name} — Portfolio`;

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords: [
      SITE.name,
      "Portfolio",
      "AI Engineer",
      "Next.js",
      "Africa Tech",
      "Burkina Faso",
      "FORGE Afrika",
    ],
    authors: [{ name: SITE.name, url: SITE.github }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      url: `/${locale}`,
      siteName: SITE.name,
      images: [{ url: SITE.photo, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE.photo],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(LOCALES, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${outfit.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-bg font-outfit text-text-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
              focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:font-outfit
              focus:text-sm focus:font-semibold focus:text-gold-ink"
          >
            {locale === "fr"
              ? "Aller au contenu"
              : locale === "tr"
                ? "İçeriğe geç"
                : "Skip to content"}
          </a>
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
