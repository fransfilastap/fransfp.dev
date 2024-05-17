import { components } from "@/components/mdx-components";
import { allPosts } from "@/lib/content";
import { Metadata, ResolvingMetadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
  const posts = await allPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const post = (await allPosts()).find((post) => post.metadata.slug === slug);

  return {
    title: post?.metadata.title,
    description: post?.metadata.description,
    authors: post?.metadata.author,
    keywords: post?.metadata.keywords,
  } as Metadata;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const post = (await allPosts()).find((post) => post.metadata.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-6 xcontainer">
      <article className="mx-auto prose md:prose-md lg:prose-md xl:prose-md text-foreground prose-headings:text-accent-foreground prose-blockquote:text-muted-foreground prose-a:text-blue-500">
        <h1 className={"font-light"}>{post.metadata.title}</h1>
        <span className="text-muted-foreground font-light text-sm">{ post.metadata.date.toDateString() }</span>
        {post.content}
      </article>
    </section>
  );
}
