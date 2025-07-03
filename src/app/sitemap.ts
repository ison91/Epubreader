import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://epubreader.tech';
  const languages = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];

  const languagesObject = languages.reduce((acc, lang) => {
    acc[lang] = `${siteUrl}/`;
    return acc;
  }, {} as { [key: string]: string });
  
  languagesObject['x-default'] = `${siteUrl}/`;

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: languagesObject,
      },
    },
  ]
}
