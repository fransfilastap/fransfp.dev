import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type PostMDX = {
  metadata: PostMetadata;
  content: string;
};

export type PostMetadata = {
  title: string;
  description: string;
  slug: string;
  date: Date;
  lastmod: Date;
  author: string;
  cover: string;
  keywords: [string];
  tags: [string];
};

const allPosts = async function () {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/mdx");
  const fileNames = await readdir(postsDirectory);
  const mdxFiles = fileNames.filter((file) => path.extname(file) === ".mdx");
  const allPostsData = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await readFile(fullPath, "utf-8");
      // gray-matter
      const matterResult = matter(fileContents);
      const slug = fileName.replace(/\.mdx$/, "");
      return {
        metadata: {
          title: matterResult.data.title,
          description: matterResult.data.description,
          author: matterResult.data.author,
          date: matterResult.data.date,
          lastmod: matterResult.data.lastmod,
          keywords: matterResult.data.keyword,
          slug: slug,
        },
        content: matterResult.content,
      } as PostMDX;
    })
  );

  return allPostsData;
};

export { allPosts };
