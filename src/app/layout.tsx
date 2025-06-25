import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// --- Local Custom Fonts ---
const atmospheric = localFont({
  src: "../fonts/Atmospheric.ttf",
  display: "swap",
  variable: "--font-atmospheric",
});

const adventureHollow = localFont({
  src: "../fonts/AdventureHollow.otf",
  display: "swap",
  variable: "--font-adventure-hollow",
});

const antiqueBook = localFont({
  src: "../fonts/AntiqueBookCover.otf",
  display: "swap",
  variable: "--font-antique-book",
});

const bonello = localFont({
  src: "../fonts/Bonello.otf",
  display: "swap",
  variable: "--font-bonello",
});

const flowersKingdom = localFont({
  src: "../fonts/FlowersKingdom.ttf",
  display: "swap",
  variable: "--font-flowers-kingdom",
});

const guardians = localFont({
  src: "../fonts/Guardians.ttf",
  display: "swap",
  variable: "--font-guardians",
});

const hollywoodHills = localFont({
  src: "../fonts/HollywoodHills.ttf",
  display: "swap",
  variable: "--font-hollywood-hills",
});

const lemonMilk = localFont({
  src: "../fonts/LemonMilk.otf",
  display: "swap",
  variable: "--font-lemonmilk",
});

const magicalNight = localFont({
  src: "../fonts/MagicalNight.woff",
  display: "swap",
  variable: "--font-magical-night",
});

const sportsWorld = localFont({
  src: "../fonts/SportsWorld.ttf",
  display: "swap",
  variable: "--font-sports-world",
});

const zombie = localFont({
  src: "../fonts/Zombie.ttf",
  display: "swap",
  variable: "--font-zombie",
});

const bosque = localFont({
  src: "../fonts/Bosque.ttf",
  display: "swap",
  variable: "--font-bosque",
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
      className={`${atmospheric.variable} ${adventureHollow.variable} ${antiqueBook.variable} ${bonello.variable} ${flowersKingdom.variable} ${guardians.variable} ${hollywoodHills.variable} ${lemonMilk.variable} ${magicalNight.variable} ${sportsWorld.variable} ${zombie.variable} ${bosque.variable}`}
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
