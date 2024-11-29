import { PostList } from '@/components/blog'
import { allPosts } from '@/lib/content'
import {  Suspense } from 'react'
import PostsLoading from '@/components/posts-loading'

export default async function Home () {
  const posts = await allPosts()

  return (
    <section className="py-4 xcontainer">
      <h2 className="my-4 text-3xl font-bold">✏️ Blog Posts.</h2>
      <Suspense fallback={<PostsLoading/>}>
        <PostList posts={posts}/>
      </Suspense>
    </section>
  )
}

