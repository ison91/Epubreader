
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";
import fs from 'fs/promises';
import path from 'path';

type Language = 'en' | 'ja' | 'ru' | 'ko' | 'ar' | 'de' | 'fr' | 'es' | 'pl' | 'zh-TW' | 'it' | 'pt' | 'bg';

const supportedLanguages: Language[] = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];

async function getTranslations(lang: Language): Promise<any> {
    const fallbackLang = 'en';
    let langToLoad = supportedLanguages.includes(lang) ? lang : fallbackLang;

    const filePath = path.join(process.cwd(), 'public', 'locales', `${langToLoad}.json`);
    
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const translations = JSON.parse(fileContent);
        
        // Ensure featureList for schema is an array of strings
        if (translations.features_list && typeof translations.features_list === 'object') {
            translations.schema_feature_list = Object.values(translations.features_list).map(
                (feature: any) => `${feature.title}: ${feature.description}`
            );
        } else {
            translations.schema_feature_list = [];
        }

        return translations;
    } catch (error) {
        console.error(`Could not load translations for ${langToLoad}, falling back to ${fallbackLang}`, error);
        if (langToLoad !== fallbackLang) {
            const fallbackPath = path.join(process.cwd(), 'public', 'locales', `${fallbackLang}.json`);
            const fileContent = await fs.readFile(fallbackPath, 'utf8');
            const translations = JSON.parse(fileContent);
            if (translations.features_list && typeof translations.features_list === 'object') {
                translations.schema_feature_list = Object.values(translations.features_list).map(
                    (feature: any) => `${feature.title}: ${feature.description}`
                );
            } else {
                translations.schema_feature_list = [];
            }
            return translations;
        }
        return { metadata: { title: { default: 'ePub Reader' } } }; // Should not happen if en.json exists
    }
}

function detectLanguage(acceptLanguage: string): Language {
  const langOrder = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());

  for (const lang of langOrder) {
    if (lang.startsWith("zh-TW")) return 'zh-TW';
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
  return 'en';
}


export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const lang = detectLanguage(acceptLanguage);
  const t = await getTranslations(lang);
  const siteUrl = 'https://epubreader.info/';

  const languagesObject = supportedLanguages.reduce((acc, currentLang) => {
    if (currentLang === 'zh-TW') {
        acc['zh-TW'] = siteUrl;
    } else {
        acc[currentLang] = siteUrl;
    }
    return acc;
  }, {} as Record<string, string>);
  

  if (!t.metadata) {
      return {
          title: "ePub Reader"
      };
  }

  return {
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
      ...t.metadata.openGraph,
      images: [
        {
          url: "https://placehold.co/1200x630.png",
          width: 1200,
          height: 630,
          alt: t.metadata.openGraph.images[0].alt,
        },
      ],
    },
    twitter: {
        ...t.metadata.twitter,
        images: ["https://placehold.co/1200x630.png"],
    },
    robots: t.metadata.robots,
  };
}

const createJsonLd = (lang: Language, translations: any) => {
    const schemaData = translations.schema || {};

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": schemaData.name,
        "url": "https://epubreader.info",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://epubreader.info"
            },
            "query-input": "required name=search_term_string"
        },
        "mainEntity": {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": schemaData.name,
            "description": schemaData.description,
            "url": "https://epubreader.info",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Any",
            "browserRequirements": "Requires HTML5 and JavaScript.",
            "fileFormat": "application/epub+zip",
            "softwareVersion": "2.0.0",
            "permissions": "No special permissions required",
            "releaseNotes": "https://epubreader.info/#features",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
            },
            "publisher": {
                "@type": "Organization",
                "name": "Firebase Studio",
            },
            "featureList": translations.schema_feature_list,
            "screenshot": "https://placehold.co/1200x630.png",
        }
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
      <body className="antialiased">
        <I18nProvider initialLocale={lang}>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
