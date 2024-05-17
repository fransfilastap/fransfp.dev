import PostCard, { PostList } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { MdxContent, allPosts } from "@/lib/content";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { Suspense } from 'react'
import PostsLoading from '@/components/posts-loading'

export default async function Home() {
  const posts = await allPosts();

  return (
    <section>
      <Masthead />
      <Suspense fallback={<div className={"xcontainer mx-auto"}><PostsLoading/></div>}>
        <FeaturedBlogPosts posts={posts} />
      </Suspense>
    </section>
  );
}

function Masthead() {
  return (
    <section className="bg-background p-10 h-[50vh] flex items-center">
      <div className="mx-auto xcontainer">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">hey, hello! I'm Frans 👋🏻</h1>
          <p className="font-light">
            I'm Tech-enthusiast, passionate about harnessing the power of code
            to drive digital transformation and create a more efficient and
            impactful government for Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedBlogPosts({ posts }: { posts: MdxContent[] }) {
  return (
    <section className="flex flex-col gap-2 xcontainer">
      <h2 className="my-3 text-xl font-semibold">Featured Posts</h2>
      <PostList posts={posts} />
      <Link href={"/blog"}>See more</Link>
    </section>
  );
}
