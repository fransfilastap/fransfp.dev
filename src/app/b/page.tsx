import BlogList, { Post } from "@/components/blog-list";
import { getAllPosts } from "@/lib/mdx-content";
import { Metadata } from "next";
import { generateBlogJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/config";

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

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, technology, and life.",
  openGraph: {
    type: 'website',
    title: `Blog | ${siteConfig.name}`,
    description: 'Thoughts on software engineering, technology, and life.',
    url: `${siteConfig.url}/b`,
  },
  alternates: {
    canonical: `${siteConfig.url}/b`,
  },
};

export default async function Page() {
  const posts = await getBlogPosts();
  const blogJsonLd = generateBlogJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      
      <div className="max-w-3xl mx-auto px-6">
        {/* Page Header */}
        <section className="py-16 md:py-20 border-b border-[var(--border-color)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            {posts.length} articles about software, technology, and life.
          </p>
        </section>
        
        {/* Blog List */}
        <section className="py-8">
          <BlogList posts={posts} />
        </section>
      </div>
    </>
  );
}
