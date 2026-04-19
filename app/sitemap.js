export default function sitemap() {
  const base = 'https://excuses.me';
  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${base}/privacy`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/terms`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];
}
