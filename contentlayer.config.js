import { makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeImgSize from 'rehype-img-size'
import { visit } from 'unist-util-visit'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Blog } from './src/contentlayer/document/Blog'

const rehypePrettyCodeoptions = {
  // Use one of Shiki's packaged themes
  theme: 'github-light',
  // Set to true to keep the background color
  keepBackground: true,
  onVisitLine (node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine (node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord (node, id) {
    node.properties.className = ['word']
  }
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeImgSize, { dir: 'public' }],
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === 'element' && node?.tagName === 'pre') {
          const [codeEl] = node.children
          if (codeEl.tagName !== 'code') return
          node.raw = codeEl.children?.[0].value
          const meta = codeEl.data?.meta || ''
          const metas = meta.match(/[^{}]+(?=})/g) || []
          if (metas.length > 0) {
            node.rawMeta = metas.join('|')
          }
        }
      })
    },
    [rehypePrettyCode, rehypePrettyCodeoptions],
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === 'element' && node?.tagName === 'div') {
          if (!('data-rehype-pretty-code-fragment' in node.properties)) {
            return
          }
          for (const child of node.children) {
            if (child.tagName === 'pre') {
              child.properties['data-raw'] = node.raw
              if (node.rawMeta) {
                const metas = node.rawMeta.split('|')
                metas.forEach(meta => {
                  const k = meta.split(':')[0]
                  const v = meta.split(':')[1]
                  child.properties[`data-${k}`] = v
                })
              }
            }
          }
        }
      })
    },
    [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }]
  ]
}

export default makeSource({
  contentDirPath: 'content/blog',
  documentTypes: [Blog],
  mdx: mdxOptions
})
