import { PostMetadata } from "@/lib/content";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

async function loadAboutPage() {
  const mdxDir = path.join(process.cwd(), "src/app/about/mdx");
  const fileContent = await readFile(path.join(mdxDir, "about.mdx"), "utf-8");
  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    content,
    frontmatter,
  };
}
export default async function AboutPage() {
  const { content, frontmatter } = await loadAboutPage();
  const metadata = frontmatter as PostMetadata;
  return (
    <section className="py-3 xcontainer">
      <article className="mx-auto prose md:prose-md lg:prose-md xl:prose-md text-foreground prose-headings:text-accent-foreground prose-blockquote:text-muted-foreground prose-a:text-blue-500">
        <h1 className="my-2">{metadata.title}</h1>
        {content}
      </article>
    </section>
  );
}
