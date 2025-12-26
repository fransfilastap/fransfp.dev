import type { Person, WebSite, Blog, BlogPosting, WithContext } from 'schema-dts';
import { siteConfig } from './config';

export function generatePersonJsonLd(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/icon.png`,
    sameAs: Object.values(siteConfig.social),
    jobTitle: 'Software Engineer',
  };
}

export function generateWebsiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

export function generateBlogJsonLd(): WithContext<Blog> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    description: 'Thoughts on software engineering, technology, and life.',
    url: `${siteConfig.url}/b`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

interface BlogPostData {
  title: string;
  description: string;
  slug: string;
  date: Date | string;
  author?: string;
  keywords?: string[] | string;
}

export function generateBlogPostJsonLd(post: BlogPostData): WithContext<BlogPosting> {
  const datePublished = post.date instanceof Date 
    ? post.date.toISOString() 
    : typeof post.date === 'string' 
      ? post.date 
      : new Date().toISOString();
  
  // Handle keywords - could be array, string, or undefined
  let keywordsString: string | undefined;
  if (Array.isArray(post.keywords)) {
    keywordsString = post.keywords.join(', ');
  } else if (typeof post.keywords === 'string') {
    keywordsString = post.keywords;
  }
    
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author || siteConfig.author.name,
      url: siteConfig.url,
    },
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/b/${post.slug}`,
    },
    url: `${siteConfig.url}/b/${post.slug}`,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    ...(keywordsString && { keywords: keywordsString }),
  };
}
