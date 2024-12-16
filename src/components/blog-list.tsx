import Link from "next/link";

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
                <article
                    key={index}
                    className="py-2"
                >
                    <Link href={`/b/${post.slug}`} className="text-xl font-bold text-gray-800 dark:text-white hover:text-green-800 mb-2">
                        {post.title}
                    </Link>
                    <p className="text-gray-600 dark:text-white/65">{post.description}</p>
                </article>
            ))}
        </div>
    );
}