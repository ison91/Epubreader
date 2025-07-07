import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://epubreader.tech';
  const languages = ['en', 'ja', 'ru', 'ko', 'ar', 'de', 'fr', 'es', 'pl', 'zh-TW', 'it', 'pt', 'bg'];

  // Generate alternate language links for each page
  const generateAlternates = () => {
    const alternates: { [key: string]: string } = {};
    for (const lang of languages) {
      alternates[lang] = `${siteUrl}/${lang}/`;
    }
    alternates['x-default'] = `${siteUrl}/`;
    return alternates;
  };

  // Main entries including homepage and each language-specific page
  const entries: MetadataRoute.Sitemap = [];

  // Homepage entry (root /)
  entries.push({
    url: `${siteUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: generateAlternates(),
    },
  });

  // Language-specific entries
  for (const lang of languages) {
    entries.push({
      url: `${siteUrl}/${lang}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: generateAlternates(),
      },
    });
  }

  return entries;
}
