import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Aladin, Cinzel, Quicksand, Varela_Round } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const aladin = Aladin({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-aladin",
});

const bosque = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const valeria = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-valeria",
});


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
      className={`${quicksand.variable} ${aladin.variable} ${bosque.variable} ${valeria.variable}`}
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
