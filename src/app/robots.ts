import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.cipheronce.com/sitemap.xml',
    host: 'https://www.cipheronce.com',
  }
}
