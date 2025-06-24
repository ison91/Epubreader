import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "ePub Reader",
  description: "A modern, accessible ePub reader built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aladin&family=Henny+Penny&family=Valeria+Round&family=Dancing+Script&family=Anton&family=Patrick+Hand&family=Great+Vibes&family=Creepster&family=Quicksand:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-headline antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
