import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import localFont from 'next/font/local';
import "./globals.css";

/*
// EXAMPLE: How to load a local font.
//
// 1. Add your font file to the `src/fonts` directory.
//    (e.g., `src/fonts/AbsoluteZero.otf`)
// 2. Uncomment and update this code to load your font.
// 3. Repeat for each font you want to load.
// 4. Add the generated CSS variable to the `<html>` tag's className below.
//
const absoluteZero = localFont({
  src: '../fonts/AbsoluteZero.otf',
  display: 'swap',
  variable: '--font-absolute-zero', // Create a CSS variable
});
*/

export const metadata: Metadata = {
  title: {
    default: "ePub Reader | Read ePub Books Online",
    template: "%s | ePub Reader",
  },
  description: "A modern, accessible, and feature-rich ePub reader built with Next.js. Upload your .epub files and enjoy a clean, distraction-free reading environment with customizable fonts and themes.",
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
    "dark mode reader"
  ],
  authors: [{ name: "Firebase Studio" }],
  creator: "Firebase Studio",
  publisher: "Firebase",
  openGraph: {
    title: "ePub Reader | Read ePub Books Online",
    description: "A modern, accessible e-reader for your browser.",
    url: "https://your-app-url.com", // Replace with your actual URL
    siteName: "ePub Reader",
    images: [
      {
        url: "https://placehold.co/1200x630.png", // Replace with an actual image of your app
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
    description: "Upload and read your ePub books directly in your browser with a clean, customizable interface.",
    images: ["https://placehold.co/1200x630.png"], // Replace with an actual image of your app
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
  description: "A modern, accessible, and feature-rich ePub reader built with Next.js. Upload your .epub files and enjoy a clean, distraction-free reading environment with customizable fonts and themes.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires HTML5 support",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  publisher: {
    "@type": "Organization",
    name: "Firebase"
  }
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
      // Add your font variables here after loading them above
      // e.g. className={absoluteZero.variable}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
