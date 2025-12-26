import Link from "next/link";
import {format} from "date-fns/format";

export interface Post {
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Props {
    posts: Post[];
}

// Estimate reading time based on description length (rough estimate)
function estimateReadingTime(description: string): number {
    const wordsPerMinute = 200;
    const words = description.split(/\s+/).length;
    // Assume full article is about 10x the description
    const estimatedWords = words * 10;
    return Math.max(1, Math.ceil(estimatedWords / wordsPerMinute));
}

export default function BlogList(props: Props) {
    return (
        <div className="space-y-6">
            {props.posts.map((post, index) => (
                <BlogPostItem key={index} post={post}/>
            ))}
        </div>
    );
}

const BlogPostItem = ({post}: { post: Post }) => {
    const readingTime = estimateReadingTime(post.description);
    
    return (
        <article className="group">
            <Link 
                href={`/b/${post.slug}`} 
                className="block p-6 -mx-6 rounded-xl hover:bg-[var(--surface)] transition-all duration-200"
            >
                {/* Date and Reading Time */}
                <div className="flex items-center gap-2 mb-3">
                    <time className="text-sm text-[var(--text-muted)]">
                        {format(post.createdAt, 'MMM d, yyyy')}
                    </time>
                    <span className="text-[var(--text-muted)]">·</span>
                    <span className="text-sm text-[var(--text-muted)]">
                        {readingTime} min read
                    </span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-3 leading-tight">
                    {post.title}
                </h2>
                
                {/* Description */}
                <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {post.description}
                </p>
                
                {/* Read more indicator */}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                </div>
            </Link>
        </article>
    )
}

export {BlogPostItem}