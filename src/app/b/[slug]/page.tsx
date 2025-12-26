import {getAllPosts, getPostBySlug} from "@/lib/mdx-content";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {format} from "date-fns/format";
import Link from "next/link";
import {generateBlogPostJsonLd} from "@/lib/json-ld";
import {siteConfig} from "@/lib/config";

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

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const {slug} = params;

    const post = (await getAllPosts()).find((post) => post.metadata.slug === slug);
    
    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }
    
    const datePublished = post.metadata.date instanceof Date 
        ? post.metadata.date.toISOString() 
        : post.metadata.date;
    
    return {
        title: post.metadata.title,
        description: post.metadata.description,
        authors: [{ name: post.metadata.author || siteConfig.author.name }],
        keywords: post.metadata.keywords,
        openGraph: {
            type: 'article',
            title: post.metadata.title,
            description: post.metadata.description,
            url: `${siteConfig.url}/b/${slug}`,
            siteName: siteConfig.name,
            publishedTime: datePublished,
            authors: [post.metadata.author || siteConfig.author.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metadata.title,
            description: post.metadata.description,
            creator: siteConfig.author.twitter,
        },
        alternates: {
            canonical: `${siteConfig.url}/b/${slug}`,
        },
    };
}

// Estimate reading time
function estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function Page({params}: Props) {
    const {slug} = await params;
    const post = (await getPostBySlug(slug));

    if (!post) {
        notFound()
    }

    const readingTime = estimateReadingTime(post.rawSource || '');
    
    // Generate JSON-LD for this blog post
    const blogPostJsonLd = generateBlogPostJsonLd({
        title: post.metadata.title,
        description: post.metadata.description,
        slug: post.metadata.slug,
        date: post.metadata.date,
        author: post.metadata.author,
        keywords: post.metadata.keywords,
    });

    return (
        <>
            {/* JSON-LD Structured Data for Blog Post */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
            />
            
            <article className="max-w-3xl mx-auto px-6">
                {/* Article Header */}
                <header className="py-12 md:py-16">
                    {/* Back link */}
                    <Link 
                        href="/b" 
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors mb-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                        All posts
                    </Link>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--text-secondary)] mb-6">
                        <time dateTime={post.metadata.date instanceof Date ? post.metadata.date.toISOString() : post.metadata.date} className="font-medium">
                            {format(post.metadata.date, 'MMMM d, yyyy')}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                        <span>{readingTime} min read</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
                        {post.metadata.title}
                    </h1>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                            {(post.metadata.author || siteConfig.author.name).split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <p className="font-medium text-[var(--foreground)]">
                                {post.metadata.author || siteConfig.author.name}
                            </p>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Software Engineer
                            </p>
                        </div>
                    </div>
                </header>
                
                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mb-12"></div>
                
                {/* Article Content */}
                <div className="prose prose-lg max-w-none pb-16">
                    {post.content}
                </div>
                
                {/* Footer */}
                <footer className="py-12 border-t border-[var(--border-color)]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Link 
                            href="/b" 
                            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                            </svg>
                            Back to all posts
                        </Link>
                        
                        {/* Share buttons */}
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <span>Share this article</span>
                            <div className="flex items-center gap-2">
                                <a 
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent(`${siteConfig.url}/b/${slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                                    aria-label="Share on X (Twitter)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a 
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${siteConfig.url}/b/${slug}`)}&title=${encodeURIComponent(post.metadata.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </article>
        </>
    )
}