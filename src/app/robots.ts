import { type MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Replace this with your actual domain URL before deploying
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
