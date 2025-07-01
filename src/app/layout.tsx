
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";
import fs from 'fs/promises';
import path from 'path';

type Language = 'en' | 'ja' | 'ru' | 'ko' | 'ar' | 'de' | 'fr' | 'es' | 'pl' | 'zh-TW' | 'it' | 'pt' | 'bg';

const supportedLanguages: Language[] = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];
const fallbackLang: Language = 'en';

async function getTranslations(lang: Language): Promise<any> {
    let langToLoad = supportedLanguages.includes(lang) ? lang : fallbackLang;

    const filePath = path.join(process.cwd(), 'public', 'locales', `${langToLoad}.json`);
    
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Could not load translations for ${langToLoad}, falling back to ${fallbackLang}`, error);
        if (langToLoad !== fallbackLang) {
            const fallbackPath = path.join(process.cwd(), 'public', 'locales', `${fallbackLang}.json`);
            const fileContent = await fs.readFile(fallbackPath, 'utf8');
            return JSON.parse(fileContent);
        }
        return { metadata: { title: { default: 'ePub Reader' } } }; // Should not happen if en.json exists
    }
}

function detectLanguage(acceptLanguage: string): Language {
  const langOrder = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());

  for (const lang of langOrder) {
    if (lang === "zh-tw") return 'zh-TW';
    if (lang.startsWith("it")) return 'it';
    if (lang.startsWith("pt")) return 'pt';
    if (lang.startsWith("bg")) return 'bg';
    if (lang.startsWith("de")) return 'de';
    if (lang.startsWith("fr")) return 'fr';
    if (lang.startsWith("es")) return 'es';
    if (lang.startsWith("pl")) return 'pl';
    if (lang.startsWith("ar")) return 'ar';
    if (lang.startsWith("ko")) return 'ko';
    if (lang.startsWith("ru")) return 'ru';
    if (lang.startsWith("ja")) return 'ja';
    if (lang.startsWith("en")) return 'en';
  }
  return fallbackLang;
}


export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const lang = detectLanguage(acceptLanguage);
  const t = await getTranslations(lang);
  const siteUrl = 'https://epubreader.info';

  const languagesObject = supportedLanguages.reduce((acc, currentLang) => {
    acc[currentLang] = `${siteUrl}`;
    return acc;
  }, {} as Record<string, string>);
  
  if (!t.metadata) {
      return {
          title: "ePub Reader",
          icons: {
            icon: '/locales/icon.png',
          }
      };
  }
  
  const ogImage = `${siteUrl}/og-image.png`;
  const twitterImage = `${siteUrl}/twitter-image.png`;

  return {
    metadataBase: new URL(siteUrl),
    icons: {
      icon: '/locales/icon.png',
    },
    title: {
      default: t.metadata.title.default,
      template: t.metadata.title.template,
    },
    description: t.metadata.description,
    keywords: t.metadata.keywords,
    authors: t.metadata.authors,
    creator: t.metadata.creator,
    publisher: t.metadata.publisher,
    alternates: {
      canonical: siteUrl,
      languages: languagesObject,
    },
    openGraph: {
      title: t.metadata.title.default,
      description: t.metadata.description,
      url: siteUrl,
      siteName: t.metadata.openGraph.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.metadata.openGraph.images[0].alt,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title.default,
      description: t.metadata.description,
      images: [twitterImage], 
      creator: t.metadata.twitter.creator,
    },
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
  };
}

const createJsonLd = (lang: Language, translations: any) => {
    const siteUrl = 'https://epubreader.info';
    const schemaTranslations = translations.schema || {};

    const featureList = Object.values(translations.features_list || {}).map((feature: any) => `${feature.title}: ${feature.description}`);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "url": siteUrl,
                "name": schemaTranslations.name,
                "inLanguage": lang,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteUrl}#?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebApplication",
                "name": schemaTranslations.name,
                "description": schemaTranslations.description,
                "url": siteUrl,
                "inLanguage": lang,
                "applicationCategory": "ProductivityApplication",
                "operatingSystem": "Any",
                "browserRequirements": "Requires HTML5 and JavaScript.",
                "fileFormat": "application/epub+zip",
                "softwareVersion": "2.0.0",
                "permissions": "No special permissions required",
                "releaseNotes": `${siteUrl}#features`,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "provider": {
                    "@type": "Organization",
                    "name": "ePubReader.info",
                     "url": siteUrl
                },
                "featureList": featureList,
                "screenshot": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/og-image.png`,
                    "width": 1200,
                    "height": 630
                }
            }
        ]
    };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  const lang = detectLanguage(acceptLanguage);
  let dir: 'ltr' | 'rtl' = 'ltr';

  if (lang === "ar") {
    dir = "rtl";
  }
  
  const translations = await getTranslations(lang);
  const jsonLd = createJsonLd(lang, translations);

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
