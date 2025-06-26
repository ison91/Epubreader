import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n";
import "./globals.css";

export const metadata: Metadata = {
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

const jsonLd = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
