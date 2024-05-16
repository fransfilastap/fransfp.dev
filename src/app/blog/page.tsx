import { PostList } from "@/components/blog";
import { allPosts } from "@/lib/content";
import { Suspense } from 'react'
import PostsLoading from '@/components/posts-loading'

export default async function PostsPage() {
  const posts = await allPosts();

  return (
    <section className="py-4 xcontainer">
      <h2 className="my-2 text-3xl font-semibold">Posts</h2>
      <Suspense fallback={<PostsLoading/>}>
        <PostList posts={posts} />
      </Suspense>
    </section>
  );
}
