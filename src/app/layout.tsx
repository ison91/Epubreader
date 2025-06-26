import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";

const enMetadata: Metadata = {
  title: {
    default: "ePub Reader | Free Online EPUB Book Reader",
    template: "%s | ePub Reader",
  },
  description:
    "Instantly read EPUB files in your browser with ePub Reader. Our free, secure, and customizable online reader offers an exceptional, distraction-free experience on any device. Upload your books and start reading now—no installation required.",
  keywords: [
    "epub reader",
    "ebook reader",
    "online book reader",
    "free epub reader",
    "read epubs online",
    "web epub viewer",
    "browser epub reader",
    "html5 epub reader",
    "javascript epub reader",
    "nextjs epub reader",
    "react epub reader",
    "epubjs reader",
    "digital book reader",
    "online document viewer",
    "read books on browser",
    "upload epub",
    "epub file opener",
    "no download ebook reader",
    "instant ebook access",
    "cloud ebook reader",
    "cross-platform reader",
    "mobile epub reader",
    "tablet ebook reader",
    "desktop epub reader",
    "lightweight epub reader",
    "fast epub loader",
    "accessible ebook reader",
    "screen reader friendly",
    "customizable reading experience",
    "change font size ebook",
    "adjust line height book",
    "dark mode reader",
    "light mode reading",
    "sepia theme reader",
    "reading progress tracker",
    "table of contents navigation",
    "ebook library online",
    "personal digital library",
    "privacy-focused reader",
    "no-login ebook reader",
    "secure epub viewer",
    "open source epub reader",
    "epub format support",
    "read .epub files",
    "online reading tool",
    "digital reading platform",
    "epub web app",
    "best online epub reader",
    "simple epub reader",
    "clean reading interface",
    "distraction-free reading",
    "epub to html",
    "web-based e-reader",
  ],
  authors: [{ name: "Firebase Studio", url: "https://epubreader.info" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  alternates: {
    canonical: "https://epubreader.info/",
    languages: {
      'en-US': 'https://epubreader.info/',
      'ja-JP': 'https://epubreader.info/',
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
    default: "ePubリーダー | 無料オンラインEPUBブックリーダー",
    template: "%s | ePubリーダー",
  },
  description:
    "ePubリーダーを使えば、ブラウザでEPUBファイルを即座に読むことができます。無料で安全、カスタマイズ可能なオンラインリーダーは、どのデバイスでも卓越した、集中できる読書体験を提供します。本をアップロードして、今すぐ読書を始めましょう—インストールは不要です。",
  keywords: [
    "EPUBリーダー", "電子書籍リーダー", "オンラインブックリーダー", "無料EPUBリーダー", "EPUBをオンラインで読む",
    "ウェブEPUBビューア", "ブラウザEPUBリーダー", "HTML5 EPUBリーダー", "JavaScript EPUBリーダー", "NextJS EPUBリーダー",
    "React EPUBリーダー", "epubjsリーダー", "デジタルブックリーダー", "オンラインドキュメントビューア", "ブラウザで本を読む",
    "EPUBアップロード", "EPUBファイルオープナー", "ダウンロード不要 電子書籍リーダー", "即時電子書籍アクセス", "クラウド電子書籍リーダー",
    "クロスプラットフォームリーダー", "モバイルEPUBリーダー", "タブレット電子書籍リーダー", "デスクトップEPUBリーダー", "軽量EPUBリーダー",
    "高速EPUBローダー", "アクセシブルな電子書籍リーダー", "スクリーンリーダー対応", "カスタマイズ可能な読書体験", "電子書籍 フォントサイズ変更",
    "本の行間調整", "ダークモードリーダー", "ライトモード読書", "セピアテーマリーダー", "読書進捗トラッカー",
    "目次ナビゲーション", "オンライン電子書籍ライブラリ", "個人デジタルライブラリ", "プライバシー重視リーダー", "ログイン不要 電子書籍リーダー",
    "安全なEPUBビューア", "オープンソースEPUBリーダー", "EPUBフォーマット対応", ".epubファイルを読む", "オンライン読書ツール",
    "デジタル読書プラットフォーム", "EPUBウェブアプリ", "最高のオンラインEPUBリーダー", "シンプルなEPUBリーダー", "クリーンな読書インターフェース",
    "集中できる読書", "EPUBからHTMLへ", "ウェブベースの電子リーダー", "電子書籍", "書籍リーダー", "オンラインで読む", "無料リーダー"
  ],
  authors: [{ name: "Firebase Studio", url: "https://epubreader.info" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  alternates: {
    canonical: "https://epubreader.info/",
     languages: {
      'en-US': 'https://epubreader.info/',
      'ja-JP': 'https://epubreader.info/',
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

const enJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ePub Reader",
  description:
    "Instantly read EPUB files from your device. Our free online ePub reader offers a clean, customizable, and distraction-free experience. No installation required.",
  url: "https://epubreader.info",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires HTML5 and JavaScript.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Firebase Studio",
  },
  featureList: [
    "EPUB File Upload and Display",
    "Content Pagination and Navigation",
    "Customizable Font Size and Line Height",
    "Mobile-Friendly Responsive Design",
    "Keyboard and Swipe Navigation",
    "Table of Contents",
  ],
  screenshot: "https://placehold.co/1200x630.png",
};

const jaJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ePubリーダー",
  description:
    "お使いのデバイスからEPUBファイルを即座に読み込みます。当社の無料オンラインePubリーダーは、クリーンでカスタマイズ可能、そして集中できる読書体験を提供します。インストールは不要です。",
  url: "https://epubreader.info",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires HTML5 and JavaScript.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Firebase Studio",
  },
  featureList: [
    "EPUBファイルのアップロードと表示",
    "コンテンツのページネーションとナビゲーション",
    "カスタマイズ可能なフォントサイズと行の高さ",
    "モバイルフレンドリーなレスポンシブデザイン",
    "キーボードとスワイプ操作によるナビゲーション",
    "目次",
  ],
  screenshot: "https://placehold.co/1200x630.png",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const isJapanese = acceptLanguage?.startsWith("ja");

  return isJapanese ? jaMetadata : enMetadata;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const isJapanese = acceptLanguage?.startsWith("ja");
  const jsonLd = isJapanese ? jaJsonLd : enJsonLd;
  const lang = isJapanese ? "ja" : "en";

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
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
