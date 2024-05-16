import type { MetadataRoute } from 'next'
import { allPosts } from '@/lib/content'

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {

  let init = [{
    url: 'https://fransfp.dev',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  },
    {
      url: 'https://fransfp.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://fransfp.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },]

  const  posts = await allPosts()

  const sitemaps = posts.map((post) => ({ url: `http://fransfp.dev/blog/${post.metadata.title}`, lastModified: post.metadata.date, changeFrequency: 'weekly',priority:0.8 }))

  return  init.concat(sitemaps)  as MetadataRoute.Sitemap

}
