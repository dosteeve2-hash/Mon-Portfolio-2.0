import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { JetBrains_Mono, Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import LenisProvider from "@/components/LenisProvider";
import ThemeScript from "@/components/ThemeScript";
import { LOCALES, SITE } from "@/lib/site";
import "../globals.css";

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
