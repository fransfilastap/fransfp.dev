import {getTop5Posts} from "@/lib/mdx-content";
import BlogList, {Post} from "@/components/blog-list";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Frans Filasta Pratama",
    description: "Frans Filasta Pratama's personal website"
}

async function getBlogPosts() {
    const posts = await getTop5Posts()
    return posts.map((post): Post => ({
        title: post.metadata.title,
        description: post.metadata.description,
        createdAt: post.metadata.date,
        updatedAt: post.metadata.lastmod,
        slug: post.metadata.slug,
    }));
}

export default async function Page() {
    const latest = await getBlogPosts()
    return (
        <section className={"flex flex-col px-8 md:px-0"}>
            <h2 className={"font-semibold text-3xl my-2"}>Latest Posts</h2>
            <BlogList posts={latest}/>
        </section>
    )
}