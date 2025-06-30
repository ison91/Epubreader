import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";

const enMetadata: Metadata = {
  title: {
    default: "ePub Reader | Free, Instant Online EPUB Book Reader",
    template: "%s | ePub Reader",
  },
  description:
    "Read your EPUB books online, anywhere, on any device. No downloads, no sign-ups. Just upload and enjoy a clean, customizable reading experience.",
  keywords: [
    "epub reader", "ebook reader", "online book reader", "free epub reader", "read epubs online",
    "web epub viewer", "browser epub reader", "html5 epub reader", "javascript epub reader", "nextjs epub reader",
    "react epub reader", "epubjs reader", "digital book reader", "online document viewer", "read books on browser",
    "upload epub", "epub file opener", "no download ebook reader", "instant ebook access", "cloud ebook reader",
    "cross-platform reader", "mobile epub reader", "tablet ebook reader", "desktop epub reader", "lightweight epub reader",
    "fast epub loader", "accessible ebook reader", "screen reader friendly", "customizable reading experience", "change font size ebook",
    "adjust line height book", "dark mode reader", "light mode reading", "sepia theme reader", "reading progress tracker",
    "table of contents navigation", "ebook library online", "personal digital library", "privacy-focused reader", "no-login ebook reader",
    "secure epub viewer", "open source epub reader", "epub format support", "read .epub files", "online reading tool",
    "digital reading platform", "epub web app", "best online epub reader", "simple epub reader", "clean reading interface",
    "distraction-free reading", "epub to html", "web-based e-reader", "free book reader", "read epub on chromebook", "how to open epub file"
  ],
  authors: [{ name: "Firebase Studio", url: "https://epubreader.info" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  alternates: {
    canonical: "https://epubreader.info/",
    languages: {
      'en-US': 'https://epubreader.info/',
      'ja-JP': 'https://epubreader.info/',
      'ru-RU': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "ePub Reader | Free, Instant Online EPUB Book Reader",
    description:
      "Read your EPUB books online, anywhere, on any device. No downloads, no sign-ups. Just upload and enjoy a clean, customizable reading experience.",
    url: "https://epubreader.info",
    siteName: "ePub Reader",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "A clean and modern interface of the ePub Reader application, showing an open book.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePub Reader | Free, Instant Online EPUB Book Reader",
    description:
      "The easiest way to read ePub books online. Upload and read your files directly in your browser with a clean, mobile-friendly, and customizable interface.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
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
};

const jaMetadata: Metadata = {
  title: {
    default: "ePubリーダー | 無料・瞬時に読めるオンラインEPUBブックリーダー",
    template: "%s | ePubリーダー",
  },
  description:
    "お使いのデバイスで、いつでもどこでもEPUBブックをオンラインで読書。ダウンロードや登録は不要。アップロードするだけで、クリーンでカスタマイズ可能な読書体験を楽しめます。",
  keywords: [
    "EPUBリーダー", "電子書籍リーダー", "オンラインブックリーダー", "無料EPUBリーダー", "EPUBをオンラインで読む",
    "ウェブEPUBビューア", "ブラウザEPUBリーダー", "HTML5 EPUBリーダー", "JavaScript EPUBリーダー", "NextJS EPUBリーダー",
    "React EPUBリーダー", "epubjsリーダー", "デジタルブックリーダー", "オンラインドキュメントビューア", "ブラウザで本を読む",
    "EPUBアップロード", "EPUBファイルオープナー", "ダウンロード不要 電子書籍リーダー", "即時電子書籍アクセス", "クラウド電子書籍リーダー",
    "クロスプラットフォームリーダー", "モバイルEPUBリーダー", "タブレットEPUBリーダー", "デスクトップEPUBリーダー", "軽量EPUBリーダー",
    "高速EPUBローダー", "アクセシブルな電子書籍リーダー", "スクリーンリーダー対応", "カスタマイズ可能な読書体験", "電子書籍 フォントサイズ変更",
    "本の行間調整", "ダークモードリーダー", "ライトモード読書", "セピアテーマリーダー", "読書進捗トラッカー",
    "目次ナビゲーション", "オンライン電子書籍ライブラリ", "個人デジタルライブラリ", "プライバシー重視リーダー", "ログイン不要 電子書籍リーダー",
    "安全なEPUBビューア", "オープンソースEPUBリーダー", "EPUBフォーマット対応", ".epubファイルを読む", "オンライン読書ツール",
    "デジタル読書プラットフォーム", "EPUBウェブアプリ", "最高のオンラインEPUBリーダー", "シンプルなEPUBリーダー", "クリーンな読書インターフェース",
    "集中できる読書", "EPUBからHTMLへ", "ウェブベースの電子リーダー", "電子書籍", "書籍リーダー", "オンラインで読む", "無料リーダー", "epub 開き方", "epub chromebook"
  ],
  authors: [{ name: "Firebase Studio", url: "https://epubreader.info" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  alternates: {
    canonical: "https://epubreader.info/",
     languages: {
      'en-US': 'https://epubreader.info/',
      'ja-JP': 'https://epubreader.info/',
      'ru-RU': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "ePubリーダー | 無料で即時に利用できるオンラインEPUBブックリーダー",
    description:
      "どんなデバイスでも、どこでもオンラインでEPUBブックを読みましょう。ダウンロードもサインアップも不要。アップロードするだけで、クリーンでカスタマイズ可能な読書体験を楽しめます。",
    url: "https://epubreader.info",
    siteName: "ePubリーダー",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "開いた本が示された、ePubリーダーアプリケーションのクリーンでモダンなインターフェース。",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePubリーダー | 無料で即時に利用できるオンラインEPUBブックリーダー",
    description:
      "オンラインでePubブックを読む最も簡単な方法。クリーンでモバイルフレンドリー、カスタマイズ可能なインターフェースで、ファイルをブラウザに直接アップロードして読み始めましょう。",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
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
};

const ruMetadata: Metadata = {
  title: {
    default: "ePub Читалка | Бесплатная, мгновенная онлайн-читалка для EPUB",
    template: "%s | ePub Читалка",
  },
  description:
    "Читайте ваши EPUB книги онлайн, где угодно, на любом устройстве. Без загрузок, без регистрации. Просто загрузите и наслаждайтесь чистым, настраиваемым опытом чтения.",
  keywords: [
    "EPUB читалка", "читалка для электронных книг", "читать книги онлайн", "бесплатная EPUB читалка", "читать EPUB онлайн",
    "просмотрщик EPUB", "браузерная EPUB читалка", "HTML5 EPUB читалка", "JavaScript EPUB читалка", "NextJS EPUB читалка",
    "React EPUB читалка", "epubjs читалка", "цифровая читалка книг", "онлайн просмотрщик документов", "читать книги в браузere",
    "загрузить EPUB", "открыть файл EPUB", "читалка без загрузки", "мгновенный доступ к книгам", "облачная читалка",
    "кросс-платформенная читалка", "мобильная EPUB читалка", "планшетная EPUB читалка", "десктопная EPUB читалка", "легкая EPUB читалка",
    "быстрый загрузчик EPUB", "доступная читалка", "для программ чтения с экрана", "настраиваемый опыт чтения", "изменить размер шрифта в книге",
    "настроить межстрочный интервал", "темный режим", "светлый режим", "режим сепии", "отслеживание прогресса чтения",
    "навигация по содержанию", "онлайн-библиотека", "личная цифровая библиотека", "конфиденциальная читалка", "читалка без регистрации",
    "безопасный просмотрщик EPUB", "читалка с открытым исходным кодом", "поддержка формата EPUB", "читать .epub файлы", "инструмент для чтения онлайн",
    "цифровая платформа для чтения", "EPUB веб-приложение", "лучшая онлайн EPUB читалка", "простая EPUB читалка", "чистый интерфейс для чтения",
    "чтение без отвлекающих факторов", "EPUB в HTML", "веб-читалка", "как открыть epub", "читалка для chromebook"
  ],
  authors: [{ name: "Firebase Studio", url: "https://epubreader.info" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  alternates: {
    canonical: "https://epubreader.info/",
    languages: {
      'en-US': 'https://epubreader.info/',
      'ja-JP': 'https://epubreader.info/',
      'ru-RU': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "ePub Читалка | Бесплатная, мгновенная онлайн-читалка для EPUB",
    description:
      "Читайте ваши EPUB книги онлайн, где угодно, на любом устройстве. Без загрузок, без регистрации. Просто загрузите и наслаждайтесь чистым, настраиваемым опытом чтения.",
    url: "https://epubreader.info",
    siteName: "ePub Читалка",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "Чистый и современный интерфейс приложения ePub Читалка, показывающий открытую книгу.",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePub Читалка | Бесплатная, мгновенная онлайн-читалка для EPUB",
    description:
      "Самый простой способ читать книги ePub онлайн. Загружайте и читайте ваши файлы прямо в браузере с чистым, мобильным и настраиваемым интерфейсом.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
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
};

const createJsonLd = (lang: 'en' | 'ja' | 'ru') => {
    const content = {
      en: {
        name: "ePub Reader",
        description: "Read your EPUB books online, anywhere, on any device. No downloads, no sign-ups. Just upload and enjoy a clean, customizable reading experience.",
        featureList: [
          "Instant Reading: No installation or registration required.",
          "Privacy First: Your files are processed in your browser and are never uploaded to our servers.",
          "Fully Customizable: Adjust font size, line height, and reading modes for your comfort.",
          "Mobile Ready: Enjoy a seamless reading experience on any device.",
          "Keyboard & Swipe Navigation",
          "Table of Contents Navigation",
          "Completely free with no ads."
        ],
      },
      ja: {
        name: "ePubリーダー",
        description: "お使いのデバイスで、いつでもどこでもEPUBブックをオンラインで読書。ダウンロードや登録は不要。アップロードするだけで、クリーンでカスタマイズ可能な読書体験を楽しめます。",
        featureList: [
          "即時読書：インストールや登録は不要です。",
          "プライバシー第一：ファイルはブラウザで処理され、サーバーにはアップロードされません。",
          "完全カスタマイズ可能：フォントサイズ、行の高さ、読書モードを快適に調整できます。",
          "モバイル対応：どのデバイスでもシームレスな読書体験を楽しめます。",
          "キーボードとスワイプによるナビゲーション",
          "目次ナビゲーション",
          "完全に無料で広告なし。"
        ],
      },
      ru: {
        name: "ePub Читалка",
        description: "Читайте ваши EPUB книги онлайн, где угодно, на любом устройстве. Без загрузок, без регистрации. Просто загрузите и наслаждайтесь чистым, настраиваемым опытом чтения.",
        featureList: [
          "Мгновенное чтение: Установка или регистрация не требуется.",
          "Конфиденциальность прежде всего: Ваши файлы обрабатываются в вашем браузере и никогда не загружаются на наши серверы.",
          "Полностью настраиваемый: Настраивайте размер шрифта, межстрочный интервал и режимы чтения для вашего удобства.",
          "Готовность к мобильным устройствам: Наслаждайтесь бесперебойным чтением на любом устройстве.",
          "Навигация с помощью клавиатуры и свайпов",
          "Навигация по оглавлению",
          "Полностью бесплатно и без рекламы."
        ],
      },
    };

    const specificContent = content[lang];

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": specificContent.name,
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
            "name": specificContent.name,
            "description": specificContent.description,
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
            "featureList": specificContent.featureList,
            "screenshot": "https://placehold.co/1200x630.png",
        }
    };
};


export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const isJapanese = acceptLanguage?.startsWith("ja");
  const isRussian = acceptLanguage?.startsWith("ru");

  if (isRussian) {
    return ruMetadata;
  }
  if (isJapanese) {
    return jaMetadata;
  }
  return enMetadata;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const isJapanese = acceptLanguage?.startsWith("ja");
  const isRussian = acceptLanguage?.startsWith("ru");
  
  let lang: 'en' | 'ja' | 'ru' = "en";

  if (isRussian) {
    lang = "ru";
  } else if (isJapanese) {
    lang = "ja";
  }

  const jsonLd = createJsonLd(lang);

  return (
    <html
      lang={lang}
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
