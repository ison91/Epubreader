
import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://epubreader.info/';

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      alternates: {
        languages: {
          'x-default': siteUrl,
          'en': siteUrl,
          'ja': siteUrl,
          'ru': siteUrl,
          'ko': siteUrl,
          'ar': siteUrl,
          'de': siteUrl,
          'fr': siteUrl,
          'es': siteUrl,
          'pl': siteUrl,
          'zh-TW': siteUrl,
          'it': siteUrl,
          'pt': siteUrl,
          'bg': siteUrl,
        },
      },
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
