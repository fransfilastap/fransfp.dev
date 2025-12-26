import {getTop5Posts} from "@/lib/mdx-content";
import BlogList, {Post} from "@/components/blog-list";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Frans Filasta Pratama",
    description: "Personal blog and thoughts on software engineering, technology, and life."
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
        <div className="max-w-3xl mx-auto px-6">
            {/* Hero Section */}
            <section className="py-16 md:py-24 border-b border-[var(--border-color)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--surface)] text-sm text-[var(--text-secondary)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
                    Software Engineer
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    Hi, I&apos;m <span className="gradient-text">Frans Filasta Pratama</span>
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Sharing thoughts on building better software, 
                    navigating bureaucracy, and the occasional life lessons learned along the way.
                </p>
                
                {/* Quick links */}
                <div className="flex flex-wrap gap-3 mt-8">
                    <Link 
                        href="/b" 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                    >
                        Read Blog
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <Link 
                        href="https://github.com/fransfilastap" 
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] text-[var(--foreground)] font-medium hover:bg-[var(--surface-hover)] transition-colors border border-[var(--border-color)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </Link>
                </div>
            </section>
            
            {/* Latest Posts */}
            <section className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        Latest Posts
                    </h2>
                    <Link 
                        href="/b" 
                        className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                    >
                        View all →
                    </Link>
                </div>
                <BlogList posts={latest}/>
            </section>
        </div>
    )
}