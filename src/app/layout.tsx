
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";
import { promises as fs } from 'fs';
import path from 'path';

// Language detection and translation logic
const supportedLocales = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];
const defaultLocale = 'en';

function detectLanguage(acceptLanguage: string): string {
  if (!acceptLanguage) {
    return defaultLocale;
  }
  const langs = acceptLanguage.split(',').map(lang => {
    const parts = lang.split(';');
    const locale = parts[0].trim();
    const q = parts[1] ? parseFloat(parts[1].replace('q=', '')) : 1.0;
    return { locale, q };
  }).sort((a, b) => b.q - a.q);

  for (const lang of langs) {
    if (supportedLocales.includes(lang.locale)) {
      return lang.locale;
    }
    const baseLocale = lang.locale.split('-')[0];
    if (supportedLocales.includes(baseLocale)) {
      return baseLocale;
    }
  }
  return defaultLocale;
}

async function getTranslations(lang: string): Promise<any> {
  const filePath = path.join(process.cwd(), `public/locales/${lang}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn(`Could not load translations for ${lang}, falling back to ${defaultLocale}.`);
    const defaultFilePath = path.join(process.cwd(), `public/locales/${defaultLocale}.json`);
    const data = await fs.readFile(defaultFilePath, 'utf-8');
    return JSON.parse(data);
  }
}


export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const lang = detectLanguage(acceptLanguage);
  const t = await getTranslations(lang);
  const siteUrl = 'https://epubreader.tech';

  if (!t.metadata) {
    return {
      title: "ePub Reader",
      description: "Read EPUB files online for free with our fast and easy-to-use ePub reader.",
      keywords: ["epub reader", "read epub online", "free epub viewer", "open epub files", "epub reader web", "online epub book reader", "interactive epub viewer", "epub reader no download", "read ebooks online", "browser epub reader", "upload and read epub", "ebook reader online", "epub file reader", "free ebook viewer", "epub viewer for website"],
      icons: {
        icon: '/locales/icon.png',
        apple: '/locales/icon.png',
      },
      robots: {
        index: true,
        follow: true,
      }
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t.metadata.title.default,
      template: t.metadata.title.template,
    },
    description: t.metadata.description,
    keywords: t.metadata.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/locales/icon.png',
      apple: '/locales/icon.png',
    },
    openGraph: {
      title: t.metadata.title.default,
      description: t.metadata.description,
      url: siteUrl,
      siteName: t.metadata.openGraph.siteName,
      images: [{
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: t.metadata.openGraph.images[0].alt,
      }],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title.default,
      description: t.metadata.description,
      images: [`${siteUrl}/twitter-image.png`],
      creator: t.metadata.twitter.creator,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const lang = detectLanguage(acceptLanguage);
  const translations = await getTranslations(lang);

  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#673AB7" />
        <link rel="apple-touch-icon" href="/locales/icon.png" />
      </head>
      <body className="antialiased font-sans">
        <I18nProvider initialLocale={lang} translations={translations}>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
