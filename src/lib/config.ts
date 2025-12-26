/**
 * Site configuration
 * Uses NEXT_PUBLIC_SITE_URL environment variable or falls back to default
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fransfp.xyz',
  name: 'Frans Filasta Pratama',
  description: 'Personal blog and thoughts on software engineering, technology, and life.',
  author: {
    name: 'Frans Filasta Pratama',
    email: 'fransfilastapratama@gmail.com',
    twitter: '@franspotter',
    github: 'fransfilastap',
    linkedin: 'fransfilastapratama',
  },
  social: {
    github: 'https://github.com/fransfilastap',
    twitter: 'https://x.com/franspotter',
    linkedin: 'https://www.linkedin.com/in/fransfilastapratama/',
  },
} as const;

export type SiteConfig = typeof siteConfig;
