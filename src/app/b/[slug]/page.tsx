import {getAllPosts, getPostBySlug} from "@/lib/mdx-content";
import {Metadata, ResolvingMetadata} from "next";
import {notFound} from "next/navigation";
import {format} from "date-fns/format";

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.metadata.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;
    const {slug} = params;

    const post = (await getAllPosts()).find((post) => post.metadata.slug === slug);
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


export default async function Page({params}: Props) {
    const {slug} = await params;
    const post = (await getPostBySlug(slug));

    if (!post) {
        notFound()
    }

    return (
        <section className={"flex flex-col container"}>
            <article
                className={"w-full md:w-3/4 prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white"}>
                <h1>{post.metadata.title}</h1>
                <p className={"text-black/30"}>{format(post.metadata.date,'PPP')}</p>
                {post.content}
            </article>
        </section>
    )
}