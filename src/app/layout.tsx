
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
    "distraction-free reading", "epub to html", "web-based e-reader", "free book reader", "read epub on chromebook", "how to open epub file",
    "epub viewer for chrome", "online novel reader", "free ebook reading", "epub online viewer", "upload and read epub"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
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
    "集中できる読書", "EPUBからHTMLへ", "ウェブベースの電子リーダー", "電子書籍", "書籍リーダー", "オンラインで読む", "無料リーダー", "epub 開き方", "epub chromebook",
    "chrome epub ビューア", "オンライン 小説 閲覧", "無料 電子ブック", "epub オンライン ビューア", "epub アップロードして読む"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
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
    "чтение без отвлекающих факторов", "EPUB в HTML", "веб-читалка", "как открыть epub", "читалка для chromebook",
    "читалка epub для chrome", "читалка романов онлайн", "бесплатное чтение электронных книг", "онлайн-просмотрщик epub", "загрузить и читать epub"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
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

const koMetadata: Metadata = {
  title: {
    default: "ePub 리더 | 무료, 즉시 온라인 EPUB 책 리더",
    template: "%s | ePub 리더",
  },
  description:
    "어디서나 모든 기기에서 EPUB 책을 온라인으로 읽으세요. 다운로드나 가입 없이. 업로드만으로 깔끔하고 맞춤 설정 가능한 독서 경험을 즐기세요.",
  keywords: [
    "EPUB 리더", "전자책 리더", "온라인 책 리더", "무료 EPUB 리더", "온라인에서 EPUB 읽기",
    "웹 EPUB 뷰어", "브라우저 EPUB 리더", "HTML5 EPUB 리더", "자바스크립트 EPUB 리더", "NextJS EPUB 리더",
    "React EPUB 리더", "epubjs 리더", "디지털 책 리더", "온라인 문서 뷰어", "브라우저에서 책 읽기",
    "EPUB 업로드", "EPUB 파일 열기", "다운로드 없는 전자책 리더", "즉시 전자책 접근", "클라우드 전자책 리더",
    "크로스플랫폼 리더", "모바일 EPUB 리더", "태블릿 전자책 리더", "데스크톱 EPUB 리더", "경량 EPUB 리더",
    "빠른 EPUB 로더", "접근성 있는 전자책 리더", "스크린 리더 친화적", "맞춤형 독서 경험", "전자책 글꼴 크기 변경",
    "책 줄 간격 조정", "다크 모드 리더", "라이트 모드 읽기", "세피아 테마 리더", "독서 진행 상황 추적기",
    "목차 탐색", "온라인 전자책 라이브러리", "개인 디지털 라이브러리", "개인정보 보호 중심 리더", "로그인 없는 전자책 리더",
    "안전한 EPUB 뷰어", "오픈 소스 EPUB 리더", "EPUB 형식 지원", ".epub 파일 읽기", "온라인 독서 도구",
    "디지털 독서 플랫폼", "EPUB 웹 앱", "최고의 온라인 EPUB 리더", "간단한 EPUB 리더", "깔끔한 독서 인터페이스",
    "집중력 있는 독서", "EPUB을 HTML로", "웹 기반 전자 리더", "무료 책 리더", "크롬북에서 epub 읽기", "epub 파일 여는 법", "이펍 리더", "전자책 보기",
    "크롬 epub 뷰어", "온라인 소설 리더", "무료 전자책 읽기", "epub 온라인 뷰어", "epub 업로드하고 읽기"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "ePub 리더 | 무료, 즉시 온라인 EPUB 책 리더",
    description:
      "어디서나 모든 기기에서 EPUB 책을 온라인으로 읽으세요. 다운로드나 가입 없이. 업로드만으로 깔끔하고 맞춤 설정 가능한 독서 경험을 즐기세요.",
    url: "https://epubreader.info",
    siteName: "ePub 리더",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "열린 책을 보여주는 ePub 리더 애플리케이션의 깔끔하고 현대적인 인터페이스.",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePub 리더 | 무료, 즉시 온라인 EPUB 책 리더",
    description:
      "온라인으로 ePub 책을 읽는 가장 쉬운 방법. 깔끔하고 모바일에 최적화된 맞춤형 인터페이스로 브라우저에 직접 파일을 업로드하고 읽으세요.",
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

const arMetadata: Metadata = {
  title: {
    default: "قارئ ePub | قارئ كتب EPUB مجاني وفوري عبر الإنترنت",
    template: "%s | قارئ ePub",
  },
  description:
    "اقرأ كتب EPUB الخاصة بك على الإنترنت، في أي مكان، وعلى أي جهاز. بدون تنزيلات أو تسجيل. فقط قم بالتحميل واستمتع بتجربة قراءة نظيفة وقابلة للتخصيص.",
  keywords: [
    "قارئ EPUB", "قارئ كتب إلكترونية", "قراءة كتب عبر الإنترنت", "قارئ EPUB مجاني", "قراءة EPUB أونلاين",
    "عارض EPUB على الويب", "قارئ EPUB للمتصفح", "قارئ EPUB بتقنية HTML5", "قارئ EPUB بجافاسكريبت", "قارئ EPUB بـ NextJS",
    "قارئ EPUB بـ React", "قارئ epubjs", "قارئ كتب رقمي", "عارض مستندات أونلاين", "قراءة الكتب في المتصفح",
    "تحميل EPUB", "فاتح ملفات EPUB", "قارئ كتب إلكترونية بدون تحميل", "وصول فوري للكتب الإلكترونية", "قارئ كتب إلكترونية سحابي",
    "قارئ متعدد المنصات", "قارئ EPUB للجوال", "قارئ كتب إلكترونية للتابلت", "قارئ EPUB لسطح المكتب", "قارئ EPUB خفيف",
    "محمل EPUB سريع", "قارئ كتب إلكترونية متاح", "متوافق مع قارئات الشاشة", "تجربة قراءة قابلة للتخصيص", "تغيير حجم خط الكتاب الإلكتروني",
    "تعديل ارتفاع السطر في الكتاب", "وضع القراءة الليلي", "وضع القراءة النهاري", "ثيم بني داكن للقراءة", "متتبع تقدم القراءة",
    "التنقل عبر جدول المحتويات", "مكتبة كتب إلكترونية على الإنترنت", "مكتبة رقمية شخصية", "قارئ يركز على الخصوصية", "قارئ كتب إلكترونية بدون تسجيل دخول",
    "عارض EPUB آمن", "قارئ EPUB مفتوح المصدر", "دعم صيغة EPUB", "قراءة ملفات .epub", "أداة قراءة عبر الإنترنت",
    "منصة قراءة رقمية", "تطبيق ويب EPUB", "أفضل قارئ EPUB عبر الإنترنت", "قارئ EPUB بسيط", "واجهة قراءة نظيفة",
    "قراءة بدون تشتيت", "EPUB إلى HTML", "قارئ إلكتروني على الويب", "قارئ كتب مجاني", "قراءة epub على كروم بوك", "كيفية فتح ملف epub",
    "عارض epub لـ chrome", "قارئ روايات اون لاين", "قراءة كتب الكترونية مجانا", "عارض epub اون لاين", "تحميل وقراءة epub"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "قارئ ePub | قارئ كتب EPUB مجاني وفوري عبر الإنترنت",
    description:
      "اقرأ كتب EPUB الخاصة بك على الإنترنت، في أي مكان، وعلى أي جهاز. بدون تنزيلات أو تسجيل. فقط قم بالتحميل واستمتع بتجربة قراءة نظيفة وقابلة للتخصيص.",
    url: "https://epubreader.info",
    siteName: "قارئ ePub",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "واجهة نظيفة وحديثة لتطبيق قارئ ePub، تظهر كتابًا مفتوحًا.",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "قارئ ePub | قارئ كتب EPUB مجاني وفوري عبر الإنترنت",
    description:
      "أسهل طريقة لقراءة كتب ePub عبر الإنترنت. قم بتحميل وقراءة ملفاتك مباشرة في متصفحك بواجهة نظيفة ومتوافقة مع الجوال وقابلة للتخصيص.",
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

const deMetadata: Metadata = {
  title: {
    default: "ePub-Reader | Kostenloser, sofortiger Online-EPUB-Buchleser",
    template: "%s | ePub-Reader",
  },
  description: "Lesen Sie Ihre EPUB-Bücher online, überall und auf jedem Gerät. Keine Downloads, keine Anmeldungen. Laden Sie einfach hoch und genießen Sie ein sauberes, anpassbares Leseerlebnis.",
  keywords: [
    "EPUB-Reader", "E-Book-Reader online", "kostenloser EPUB-Reader", "EPUBs online lesen", "Web-EPUB-Viewer", 
    "Browser-EPUB-Reader", "epubjs-Reader", "digitale Bücher lesen", "EPUB hochladen", "EPUB-Datei öffnen", 
    "E-Book-Reader ohne Download", "sofortiger E-Book-Zugriff", "plattformübergreifender Reader", "leichter EPUB-Reader", "datenschutzorientierter Reader", 
    "EPUB-Reader ohne Anmeldung", "Open-Source-EPUB-Reader", "epub-Dateien lesen", "Online-Lesetool", "Web-App für EPUBs", 
    "bester Online-EPUB-Reader", "einfacher EPUB-Reader", "ablenkungsfreies Lesen", "epub öffnen", "epub auf chromebook lesen",
    "buch online lesen", "dokumentenbetrachter", "privater ebook reader", "sicherer epub viewer", "epub software", "e-reader app"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "ePub-Reader | Kostenloser, sofortiger Online-EPUB-Buchleser",
    description: "Lesen Sie Ihre EPUB-Bücher online, überall und auf jedem Gerät. Keine Downloads, keine Anmeldungen. Einfach hochladen und genießen.",
    url: "https://epubreader.info",
    siteName: "ePub-Reader",
    images: [{ url: "https://placehold.co/1200x630.png", width: 1200, height: 630, alt: "Eine saubere und moderne Oberfläche der ePub-Reader-Anwendung, die ein geöffnetes Buch zeigt." }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePub-Reader | Der einfachste Weg, ePubs online zu lesen",
    description: "Laden Sie Ihre ePub-Dateien direkt im Browser hoch und lesen Sie sie mit einer sauberen, mobilfreundlichen und anpassbaren Oberfläche.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
  robots: { index: true, follow: true },
};

const frMetadata: Metadata = {
  title: {
    default: "Lecteur ePub | Liseuse de livres EPUB en ligne, gratuite et instantanée",
    template: "%s | Lecteur ePub",
  },
  description: "Lisez vos livres EPUB en ligne, n'importe où, sur n'importe quel appareil. Sans téléchargement ni inscription. Téléversez simplement et profitez d'une expérience de lecture propre et personnalisable.",
  keywords: [
    "lecteur EPUB", "liseuse en ligne", "lecteur EPUB gratuit", "lire des EPUB en ligne", "visionneuse EPUB web",
    "lecteur EPUB pour navigateur", "lecteur epubjs", "lire des livres numériques", "téléverser EPUB", "ouvrir fichier EPUB",
    "liseuse sans téléchargement", "accès instantané aux ebooks", "lecteur multiplateforme", "lecteur EPUB léger", "lecteur respectueux de la vie privée",
    "lecteur EPUB sans connexion", "lecteur EPUB open source", "lire fichiers .epub", "outil de lecture en ligne", "application web EPUB",
    "meilleur lecteur EPUB en ligne", "lecteur EPUB simple", "lecture sans distraction", "ouvrir epub", "lire epub sur chromebook",
    "comment ouvrir un fichier epub", "visionneuse epub chrome", "livre numérique gratuit", "lire en ligne", "bibliothèque numérique"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "Lecteur ePub | Liseuse de livres EPUB en ligne, gratuite et instantanée",
    description: "Lisez vos livres EPUB en ligne, n'importe où, sur n'importe quel appareil. Sans téléchargement ni inscription.",
    url: "https://epubreader.info",
    siteName: "Lecteur ePub",
    images: [{ url: "https://placehold.co/1200x630.png", width: 1200, height: 630, alt: "Une interface claire et moderne de l'application Lecteur ePub, montrant un livre ouvert." }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lecteur ePub | Le moyen le plus simple de lire des EPUB en ligne",
    description: "Téléversez et lisez vos fichiers EPUB directement dans votre navigateur avec une interface claire, adaptée aux mobiles et personnalisable.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
  robots: { index: true, follow: true },
};

const esMetadata: Metadata = {
  title: {
    default: "Lector ePub | Lector de libros EPUB online, gratuito e instantáneo",
    template: "%s | Lector ePub",
  },
  description: "Lee tus libros EPUB en línea, en cualquier lugar y en cualquier dispositivo. Sin descargas ni registros. Simplemente sube tu archivo y disfruta de una experiencia de lectura limpia y personalizable.",
  keywords: [
    "lector EPUB", "lector de ebooks online", "lector EPUB gratis", "leer EPUBs online", "visor EPUB web",
    "lector EPUB para navegador", "lector epubjs", "leer libros digitales", "subir EPUB", "abrir archivo EPUB",
    "lector de ebooks sin descargar", "acceso instantáneo a ebooks", "lector multiplataforma", "lector EPUB ligero", "lector centrado en la privacidad",
    "lector EPUB sin registro", "lector EPUB de código abierto", "leer archivos .epub", "herramienta de lectura online", "aplicación web EPUB",
    "mejor lector EPUB online", "lector EPUB simple", "lectura sin distracciones", "abrir epub", "leer epub en chromebook",
    "abrir .epub", "lector de libros gratis", "biblioteca virtual", "privacidad lector", "leer en el navegador"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "Lector ePub | Lector de libros EPUB online, gratuito e instantáneo",
    description: "Lee tus libros EPUB en línea, en cualquier lugar y en cualquier dispositivo. Sin descargas ni registros.",
    url: "https://epubreader.info",
    siteName: "Lector ePub",
    images: [{ url: "https://placehold.co/1200x630.png", width: 1200, height: 630, alt: "Una interfaz limpia y moderna de la aplicación Lector ePub, mostrando un libro abierto." }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lector ePub | La forma más fácil de leer EPUBs online",
    description: "Sube y lee tus archivos EPUB directamente en tu navegador con una interfaz limpia, adaptable a móviles y personalizable.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
  robots: { index: true, follow: true },
};

const plMetadata: Metadata = {
  title: {
    default: "Czytnik ePub | Darmowy, natychmiastowy czytnik książek EPUB online",
    template: "%s | Czytnik ePub",
  },
  description: "Czytaj swoje książki EPUB online, gdziekolwiek, na dowolnym urządzeniu. Bez pobierania, bez rejestracji. Po prostu prześlij plik i ciesz się czystym, dostosowywanym interfejsem do czytania.",
  keywords: [
    "czytnik EPUB", "czytnik e-booków online", "darmowy czytnik EPUB", "czytaj EPUB online", "przeglądarka EPUB web",
    "czytnik EPUB w przeglądarce", "czytnik epubjs", "czytanie książek cyfrowych", "prześlij EPUB", "otwórz plik EPUB",
    "czytnik e-booków bez pobierania", "natychmiastowy dostęp do e-booków", "czytnik wieloplatformowy", "lekki czytnik EPUB", "czytnik dbający o prywatność",
    "czytnik EPUB bez logowania", "czytnik EPUB open source", "czytaj pliki .epub", "narzędzie do czytania online", "aplikacja webowa EPUB",
    "najlepszy czytnik EPUB online", "prosty czytnik EPUB", "czytanie bez rozpraszaczy", "jak otworzyć epub", "czytnik epub na chromebook",
    "otwieranie epub", "darmowe ebooki online", "czytnik online", "bezpieczny czytnik", "prywatność e-book"
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
      'ko-KR': 'https://epubreader.info/',
      'ar': 'https://epubreader.info/',
      'de-DE': 'https://epubreader.info/',
      'fr-FR': 'https://epubreader.info/',
      'es-ES': 'https://epubreader.info/',
      'pl-PL': 'https://epubreader.info/',
    },
  },
  openGraph: {
    title: "Czytnik ePub | Darmowy, natychmiastowy czytnik książek EPUB online",
    description: "Czytaj swoje książki EPUB online, gdziekolwiek, na dowolnym urządzeniu. Bez pobierania, bez rejestracji.",
    url: "https://epubreader.info",
    siteName: "Czytnik ePub",
    images: [{ url: "https://placehold.co/1200x630.png", width: 1200, height: 630, alt: "Czysty i nowoczesny interfejs aplikacji Czytnik ePub, pokazujący otwartą książkę." }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Czytnik ePub | Najprostszy sposób na czytanie EPUB online",
    description: "Przesyłaj i czytaj swoje pliki EPUB bezpośrednio w przeglądarce dzięki czystemu, mobilnemu i dostosowywanemu interfejsowi.",
    images: ["https://placehold.co/1200x630.png"],
    creator: "@Firebase",
  },
  robots: { index: true, follow: true },
};


const createJsonLd = (lang: 'en' | 'ja' | 'ru' | 'ko' | 'ar' | 'de' | 'fr' | 'es' | 'pl') => {
    const content = {
      en: {
        name: "ePub Reader",
        description: "Read your EPUB books online, anywhere, on any device. No downloads, no sign-ups. Just upload and enjoy a clean, customizable reading experience.",
        featureList: [
          "Instant & Free: No installation or registration required. Upload and read instantly.",
          "Privacy First: Your files are processed in your browser and are never uploaded to our servers.",
          "Fully Customizable: Adjust font size, line height, and reading modes for your comfort.",
          "Mobile Ready: Enjoy a seamless reading experience on any device.",
          "Keyboard & Swipe Navigation for easy page turning.",
          "Table of Contents Navigation to jump to any chapter.",
          "Completely free with no ads."
        ],
      },
      ja: {
        name: "ePubリーダー",
        description: "お使いのデバイスで、いつでもどこでもEPUBブックをオンラインで読書。ダウンロードや登録は不要。アップロードするだけで、クリーンでカスタマイズ可能な読書体験を楽しめます。",
        featureList: [
          "即時読書：インストールや登録は不要ですぐに読書開始。",
          "プライバシー第一：ファイルはブラウザで処理され、サーバーにはアップロードされません。",
          "完全カスタマイズ可能：フォントサイズ、行の高さ、読書モードを快適に調整できます。",
          "モバイル対応：どのデバイスでもシームレスな読書体験を楽しめます。",
          "キーボードとスワイプによる簡単なページめくり。",
          "目次ナビゲーションで好きな章にジャンプ。",
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
          "Навигация с помощью клавиатуры и свайпов для легкого перелистывания страниц.",
          "Навигация по оглавлению для перехода к любой главе.",
          "Полностью бесплатно и без рекламы."
        ],
      },
      ko: {
        name: "ePub 리더",
        description: "어디서나 모든 기기에서 EPUB 책을 온라인으로 읽으세요. 다운로드나 가입 없이. 업로드만으로 깔끔하고 맞춤 설정 가능한 독서 경험을 즐기세요.",
        featureList: [
          "즉시 읽기: 설치나 가입 없이 바로 책을 업로드하고 읽기 시작할 수 있습니다.",
          "개인정보 보호 우선: 파일은 브라우저 내에서 처리되며 서버로 업로드되지 않습니다.",
          "완전한 사용자 맞춤화: 글꼴 크기, 줄 간격, 읽기 모드를 원하는 대로 조정할 수 있습니다.",
          "모바일 최적화: 데스크톱부터 스마트폰까지 모든 기기에서 원활한 독서 경험을 제공합니다.",
          "키보드 및 스와이프 탐색으로 쉬운 페이지 넘김.",
          "목차 탐색으로 원하는 챕터로 즉시 이동.",
          "광고 없이 완전 무료입니다."
        ],
      },
      ar: {
        name: "قارئ ePub",
        description: "اقرأ كتب EPUB الخاصة بك على الإنترنت، في أي مكان، وعلى أي جهاز. بدون تنزيلات أو تسجيل. فقط قم بالتحميل واستمتع بتجربة قراءة نظيفة وقابلة للتخصيص.",
        featureList: [
          "قراءة فورية: لا حاجة للتثبيت أو التسجيل. قم بالتحميل والقراءة فورًا.",
          "الخصوصية أولاً: تتم معالجة ملفاتك في متصفحك فقط ولا تُرفع إلى خوادمنا.",
          "قابل للتخصيص بالكامل: يمكنك ضبط حجم الخط، وارتفاع السطر، ووضع القراءة حسب راحتك.",
          "متوافق مع الجوال: استمتع بتجربة قراءة سلسة على أي جهاز.",
          "التنقل باستخدام لوحة المفاتيح والسحب لقلب الصفحات بسهولة.",
          "التنقل عبر جدول المحتويات للقفز إلى أي فصل.",
          "مجاني تمامًا وبدون إعلانات."
        ],
      },
      de: {
        name: "ePub-Reader",
        description: "Lesen Sie Ihre EPUB-Bücher online, überall und auf jedem Gerät. Keine Downloads, keine Anmeldungen. Laden Sie einfach hoch und genießen Sie ein sauberes, anpassbares Leseerlebnis.",
        featureList: [
          "Sofort & kostenlos: Keine Installation oder Registrierung nötig.",
          "Datenschutz zuerst: Ihre Dateien werden lokal im Browser verarbeitet und nie auf Server hochgeladen.",
          "Anpassbares Leseerlebnis: Passen Sie Schriftgröße, Zeilenhöhe und Lesemodi an.",
          "Funktioniert auf jedem Gerät: Nahtloses Leseerlebnis auf Desktop, Tablet oder Smartphone.",
          "Einfache Navigation: Blättern Sie mit Tastatur oder Wischgesten.",
          "Inhaltsverzeichnis-Navigation: Springen Sie direkt zu jedem Kapitel.",
          "Völlig kostenlos und werbefrei."
        ],
      },
      fr: {
        name: "Lecteur ePub",
        description: "Lisez vos livres EPUB en ligne, n'importe où, sur n'importe quel appareil. Sans téléchargement ni inscription. Téléversez simplement et profitez d'une expérience de lecture propre et personnalisable.",
        featureList: [
          "Instantané et gratuit: Aucune installation ni inscription requise.",
          "Confidentialité avant tout: Vos fichiers sont traités localement dans votre navigateur.",
          "Expérience personnalisée: Ajustez la taille de la police, l'interligne et les modes de lecture.",
          "Fonctionne sur tout appareil: Expérience de lecture fluide sur ordinateur, tablette et smartphone.",
          "Navigation facile: Utilisez le clavier ou le balayage pour tourner les pages.",
          "Navigation par table des matières: Accédez directement à n'importe quel chapitre.",
          "Totalement gratuit et sans publicité."
        ],
      },
      es: {
        name: "Lector ePub",
        description: "Lee tus libros EPUB en línea, en cualquier lugar y en cualquier dispositivo. Sin descargas ni registros. Simplemente sube tu archivo y disfruta de una experiencia de lectura limpia y personalizable.",
        featureList: [
          "Instantáneo y gratis: No requiere instalación ni registro.",
          "Privacidad primero: Tus archivos se procesan localmente en tu navegador y nunca se suben a nuestros servidores.",
          "Experiencia personalizable: Ajusta el tamaño de fuente, interlineado y modos de lectura.",
          "Funciona en cualquier dispositivo: Disfruta una lectura fluida en ordenador, tablet o móvil.",
          "Navegación sencilla: Pasa las páginas con el teclado o deslizando.",
          "Navegación por índice: Salta directamente a cualquier capítulo.",
          "Completamente gratis y sin anuncios."
        ],
      },
      pl: {
        name: "Czytnik ePub",
        description: "Czytaj swoje książki EPUB online, gdziekolwiek, na dowolnym urządzeniu. Bez pobierania, bez rejestracji. Po prostu prześlij plik i ciesz się czystym, dostosowywanym interfejsem do czytania.",
        featureList: [
          "Natychmiastowy i bezpłatny: Bez instalacji i rejestracji.",
          "Prywatność przede wszystkim: Twoje pliki są przetwarzane lokalnie w przeglądarce i nigdy nie są wysyłane na serwery.",
          "Dostosowane doświadczenie: Dostosuj rozmiar czcionki, interlinię i tryby czytania.",
          "Działa na każdym urządzeniu: Płynne czytanie na komputerze, tablecie i smartfonie.",
          "Łatwa nawigacja: Przewracaj strony za pomocą klawiatury lub gestów.",
          "Nawigacja po spisie treści: Przechodź bezpośrednio do dowolnego rozdziału.",
          "Całkowicie za darmo i bez reklam."
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
  const acceptLanguage = headersList.get("accept-language") || "";
  
  if (acceptLanguage.startsWith("de")) return deMetadata;
  if (acceptLanguage.startsWith("fr")) return frMetadata;
  if (acceptLanguage.startsWith("es")) return esMetadata;
  if (acceptLanguage.startsWith("pl")) return plMetadata;
  if (acceptLanguage.startsWith("ar")) return arMetadata;
  if (acceptLanguage.startsWith("ko")) return koMetadata;
  if (acceptLanguage.startsWith("ru")) return ruMetadata;
  if (acceptLanguage.startsWith("ja")) return jaMetadata;

  return enMetadata;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  let lang: 'en' | 'ja' | 'ru' | 'ko' | 'ar' | 'de' | 'fr' | 'es' | 'pl' = "en";
  let dir: 'ltr' | 'rtl' = 'ltr';

  if (acceptLanguage.startsWith("ar")) {
    lang = "ar";
    dir = "rtl";
  } else if (acceptLanguage.startsWith("ko")) {
    lang = "ko";
  } else if (acceptLanguage.startsWith("ru")) {
    lang = "ru";
  } else if (acceptLanguage.startsWith("ja")) {
    lang = "ja";
  } else if (acceptLanguage.startsWith("de")) {
    lang = "de";
  } else if (acceptLanguage.startsWith("fr")) {
    lang = "fr";
  } else if (acceptLanguage.startsWith("es")) {
    lang = "es";
  } else if (acceptLanguage.startsWith("pl")) {
    lang = "pl";
  }

  const jsonLd = createJsonLd(lang);

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
