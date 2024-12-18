import BlogList, { Post } from "@/components/blog-list";
import { getAllPosts } from "@/lib/mdx-content";

async function getBlogPosts() {
  const posts = await getAllPosts();
  return posts.map(
    (post) =>
      ({
        title: post.metadata.title,
        description: post.metadata.description,
        slug: post.metadata.slug,
        createdAt: post.metadata.date,
        updatedAt: post.metadata.lastmod,
      }) as Post,
  );
}

export const metadata = {
  title: "Blog Posts | Frans Filasta Pratama",
  description: "Frans Filasta Pratama's personal blog",
};

export default async function Page() {
  const posts = await getBlogPosts();
  return (
    <section className={"flex flex-col px-8 md:px-0"}>
      <h1 className="font-semibold text-3xl my-2">Blog Posts.</h1>
      <BlogList posts={posts} />
    </section>
  );
}

