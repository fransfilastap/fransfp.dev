import { MdxContent, ContentMetadata } from "@/lib/content";
import Link from "next/link";
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export type PostCardProps = ComponentPropsWithoutRef<"article"> & {
  post: ContentMetadata;
};
export default function PostCard({ post, ...rest }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`}>
      <article className="py-2 transition-all duration-75 group" {...rest}>
        <h2 className="font-medium hover:text-blue-500">{post.title}</h2>
        <p className="font-light">{post.description}</p>
      </article>
    </Link>
  );
}


const PostList = forwardRef<HTMLDivElement, { posts: MdxContent[] }>((props, ref) => {
  return (
    <div className="grid grid-cols-1 gap-2 2xl:grid-cols-2" ref={ref}>
      {props.posts.map((post, i) => (
        <PostCard post={post.metadata} key={i}/>
      ))}
    </div>
  );
});

export {
  PostList
}
