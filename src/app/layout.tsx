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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&family=EB+Garamond:wght@400;700&family=Merriweather:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Tinos:wght@400;700&display=swap"
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
