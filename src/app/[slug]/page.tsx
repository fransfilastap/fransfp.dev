import {allPosts} from "@/lib/content";
import {Metadata, ResolvingMetadata} from "next";
import {notFound} from "next/navigation";

export async function generateStaticParams() {
  const posts = await allPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  const post = (await allPosts()).find((post) => post.metadata.slug === slug);

  return {
    title: post?.metadata.title,
    description: post?.metadata.description,
    authors: post?.metadata.author,
    keywords: post?.metadata.keywords,
    date: post?.metadata.date,
    slug: post?.metadata.slug,
    parent,
  } as Metadata;
}

export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { slug } = params;

  const post = (await allPosts()).find((post) => post.metadata.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-6 xcontainer">
      <article className="mx-auto prose md:prose-md lg:prose-md xl:prose-md text-foreground prose-headings:text-accent-foreground prose-blockquote:text-muted-foreground prose-a:text-blue-500 prose-code:text-white prose-bold:text-white">
        <h1 className={"font-heading"}>{post.metadata.title}</h1>
        <span className="text-muted-foreground font-light text-sm">{ post.metadata.date.toDateString() }</span>
        {post.content}
      </article>
    </section>
  );
}
