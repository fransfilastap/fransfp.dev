import type { NextConfig } from "next";
import createMDX from '@next/mdx'
/*import rehypeMDXImportMedia from 'rehype-mdx-import-media'*/

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote'],
};

const withMDX = createMDX({
    /*extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypeMDXImportMedia],
    }*/
})

export default withMDX(nextConfig)
