import type { Metadata } from "next";
import {
  Poppins,
  Playfair_Display,
  Open_Sans,
  Merriweather,
  Lora,
  Crimson_Text,
} from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-crimson-text",
});

export const metadata: Metadata = {
  title: {
    default: "ePub Reader | Read ePub Books Online",
    template: "%s | ePub Reader",
  },
  description:
    "A modern, accessible, and feature-rich ePub reader built with Next.js. Upload your .epub files and enjoy a clean, distraction-free reading environment with customizable fonts and themes.",
  keywords: [
    "epub reader",
    "ebook reader",
    "online book reader",
    "nextjs epub reader",
    "free epub reader",
    "read epubs online",
    "epubjs reader",
    "web reader",
    "digital book reader",
    "online epub viewer",
    "customizable reader",
    "dark mode reader",
  ],
  authors: [{ name: "Firebase Studio" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  openGraph: {
    title: "ePub Reader | Read ePub Books Online",
    description: "A modern, accessible e-reader for your browser.",
    url: "https://your-app-url.com",
    siteName: "ePub Reader",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "ePub Reader Application Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePub Reader | Read ePub Books Online",
    description:
      "Upload and read your ePub books directly in your browser with a clean, customizable interface.",
    images: ["https://placehold.co/1200x630.png"],
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
    "A modern, accessible, and feature-rich ePub reader built with Next.js. Upload your .epub files and enjoy a clean, distraction-free reading environment with customizable fonts and themes.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires HTML5 support",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Firebase",
  },
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
      className={`${poppins.variable} ${playfair.variable} ${openSans.variable} ${merriweather.variable} ${lora.variable} ${crimsonText.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-headline antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
