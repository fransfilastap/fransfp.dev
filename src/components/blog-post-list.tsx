"use client";

import { Blog } from "contentlayer/generated";
import BlogPost from "./blog-post";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function BlogPostList({ posts }: { posts: Blog[] }) {
  const { get } = useSearchParams();
  const filter = get("tag");
  const blogs = useMemo<Blog[]>(() => {
    if (filter) return posts.filter((b) => b.tags?.includes(filter));
    return posts;
  }, [filter]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {blogs.map((post, i) => (
        <BlogPost key={i} blog={post} />
      ))}
    </div>
  );
}
