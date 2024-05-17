import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

export type MdxContent = {
  metadata: ContentMetadata;
  content: any;
};

export type ContentMetadata = {
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

      return await readMdx(fullPath)
    })
  );

  return allPostsData.sort((a,b)=> {
    // @ts-ignore
    return b.metadata.date - a.metadata.date
  });
};

async function readMdx(filepath:string): Promise<MdxContent>{
  const fileContents = await readFile(filepath, "utf-8");

  // gray-matter
  const matterResult = matter(fileContents);
  const slug = path.basename(filepath).replace(/\.mdx$/, "")

  const { content } = await compileMDX({
    source: matterResult.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        format: 'mdx',
      },
    }
  });

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
    content: content,
  } as MdxContent;
}

export { allPosts, readMdx };
