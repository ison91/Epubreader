import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://epubreader.info';
  const languages = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];

  const languageAlternates = languages.reduce((acc, lang) => {
    acc[lang] = `${siteUrl}/`;
    return acc;
  }, {} as Record<string, string>);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'x-default': `${siteUrl}/`,
          ...languageAlternates
        },
      },
    },
  ]
}
