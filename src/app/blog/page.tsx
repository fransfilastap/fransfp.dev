import Container from "@/components/container";
import { Metadata } from "next";
import BlogPost from "@/components/blog-post";
import { Suspense } from "react";
import clsxm from "@/helpers/clsxm";
import { getBlogPostandTag } from "@/lib/blog";
import Tags from "@/components/tags";
import { useRouter, useSearchParams } from "next/navigation";
import BlogPostList from "@/components/blog-post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function Page() {
  const { posts, tags } = getBlogPostandTag();
  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between mb-10">
        <h2 className="font-[600] py-5 text-7xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Blog
        </h2>
        <p className="text-lg font-light">
          My Thought, experiments, and tutorial
        </p>
      </div>
      <Tags values={tags} total={posts.length} />
      <Suspense fallback={<Skeleton />}>
        <BlogPostList posts={posts} />
      </Suspense>
    </Container>
  );
}

function Skeleton() {
  return (
    <div
      className={
        "flex flex-col justify-center items-center w-full h-[100vh] border border-gray-50"
      }
    >
      <p className="font-[500]">Loading....</p>
    </div>
  );
}
