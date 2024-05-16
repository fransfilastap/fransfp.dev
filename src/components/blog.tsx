import { PostMDX, PostMetadata } from "@/lib/content";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export type PostCardProps = ComponentPropsWithoutRef<"article"> & {
  post: PostMetadata;
};
export default function PostCard({ post, ...rest }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="py-2 transition-all duration-75 group" {...rest}>
        <h2 className="font-medium hover:text-blue-500">{post.title}</h2>
        <p className="font-light">{post.description}</p>
      </article>
    </Link>
  );
}

export function PostList({ posts }: { posts: PostMDX[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 2xl:grid-cols-2">
      {posts.map((post, i) => (
        <PostCard post={post.metadata} key={i} />
      ))}
    </div>
  );
}
