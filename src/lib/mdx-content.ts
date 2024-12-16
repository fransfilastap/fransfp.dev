import {readdir, readFile} from "fs/promises";
import path from "path";
import {compileMDX, type MDXRemoteSerializeResult} from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import {components} from "@/components/mdx/components";
import rehypeMDXImportMedia from 'rehype-mdx-import-media'


export interface Frontmatter {
    title: string;
    slug: string;
    date: Date;
    lastmod: Date;
    author: string;
    description: string;
    keywords: [string];
    tags: [string];
    cover?: string;
}

export interface MdxContent {
    metadata: Frontmatter;
    content: never;
    compiledSource: MDXRemoteSerializeResult;
    rawSource: string;
};


const getAllPosts = async function () {
    const postsDirectory = path.join(process.cwd(), "src/contents");
    const fileNames = await readdir(postsDirectory);
    const mdxFiles = fileNames.filter((file) => path.extname(file) === ".mdx");
    const allPostsData = await Promise.all(
        mdxFiles.map(async (fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            return await readMdx(fullPath)
        })
    );

    return allPostsData.sort((a,b)=> {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });
};

const getPostBySlug = async function (slug: string) {
    const contentDir = path.join(process.cwd(), "src/contents");
    const fullPath = path.join(contentDir, `${slug}.mdx`);
    return await readMdx(fullPath);
}

async function readMdx(filepath: string): Promise<MdxContent> {
    const fileContents = await readFile(filepath, "utf-8");

    //const source = matter(fileContents);
    const slug = path.basename(filepath).replace(/\.mdx$/, "")

    const {content, frontmatter} = await compileMDX({
        source: fileContents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeMDXImportMedia],
                format: 'mdx',
            },
        },
        components: components
    });

    return {
        metadata: {
            title: frontmatter.title,
            description: frontmatter.description,
            author: frontmatter.author,
            date: frontmatter.date,
            lastmod: frontmatter.lastmod,
            keywords: frontmatter.keywords,
            slug: slug,
        },
        content: content,
    } as MdxContent;
}


async function getTop5Posts() {
    const posts = await getAllPosts();
    return posts.slice(0, 5);
}

export {getAllPosts, getTop5Posts, readMdx, getPostBySlug};
