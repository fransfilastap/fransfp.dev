import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx-content'

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {

  const init = [{
    url: 'https://blog.fransfp.dev',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  },
    {
      url: 'https://blog.fransfp.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://blog.fransfp.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },]

  const  posts = await getAllPosts()

  const sitemaps = posts.map((post) => ({ url: `http://blog.fransfp.dev/b/${post.metadata.title}`, lastModified: post.metadata.date, changeFrequency: 'weekly',priority:0.8 }))

  return  init.concat(sitemaps)  as MetadataRoute.Sitemap

}
