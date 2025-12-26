import {readdir, readFile} from "fs/promises";
import path from "path";
import {compileMDX, type MDXRemoteSerializeResult} from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import {components} from "@/components/mdx/components";
import rehypeMDXImportMedia from 'rehype-mdx-import-media'
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";

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

// Enhanced rehype-pretty-code options
const rehypePrettyCodeOptions: Options = {
    theme: "github-dark-dimmed",
    keepBackground: true,
    defaultLang: "plaintext",
    // Add line numbers via data attribute
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode
        if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }];
        }
    },
    onVisitHighlightedLine(node) {
        if (!node.properties.className) {
            node.properties.className = [];
        }
        node.properties.className.push("line--highlighted");
    },
    onVisitHighlightedChars(node) {
        if (!node.properties.className) {
            node.properties.className = [];
        }
        node.properties.className.push("word--highlighted");
    },
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

    return allPostsData.sort((a, b) => {
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

    const slug = path.basename(filepath).replace(/\.mdx$/, "")

    const {content, frontmatter} = await compileMDX({
        source: fileContents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeMDXImportMedia, 
                    [rehypePrettyCode, rehypePrettyCodeOptions]
                ],
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
        rawSource: fileContents,
    } as MdxContent;
}


async function getTop5Posts() {
    const posts = await getAllPosts();
    return posts.slice(0, 5);
}

export {getAllPosts, getTop5Posts, readMdx, getPostBySlug};
