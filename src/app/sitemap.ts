
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
          'en-US': siteUrl,
          'ja-JP': siteUrl,
          'ru-RU': siteUrl,
          'ko-KR': siteUrl,
          'ar': siteUrl,
        },
      },
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
