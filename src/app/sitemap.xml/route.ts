import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const siteUrl = 'https://epubreader.info';
  const languages = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];

  const alternates = languages.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}/"/>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>
${alternates}
  </url>
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
