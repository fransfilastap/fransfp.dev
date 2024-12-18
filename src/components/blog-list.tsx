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

export default function BlogList(props: Props) {
    return (
        <div className="space-y-2">
            {props.posts.map((post, index) => (
                <BlogPostItem key={index} post={post}/>
            ))}
        </div>
    );
}

const BlogPostItem = ({post}: { post: Post }) => {
    return (
        <article
            className="py-2"
        >
            <p className="text-gray-600 dark:text-white/65 text-xs font-mono">{format(post.createdAt, 'PPP')}</p>
            <Link href={`/b/${post.slug}`}
                  className="text-xl font-semibold text-gray-800 dark:text-white hover:text-green-800 mb-2">
                {post.title}
            </Link>
            <p className="text-gray-600 dark:text-white/65 font-light">{post.description}</p>
        </article>
    )
}

export {BlogPostItem}