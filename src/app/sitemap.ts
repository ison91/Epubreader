import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace this with your actual domain URL before deploying
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
