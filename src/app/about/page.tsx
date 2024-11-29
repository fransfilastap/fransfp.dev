import { readMdx } from '@/lib/content'
import path from 'path'

async function loadAboutPage() {
  const mdxDir = path.join(process.cwd(), "src/app/about/mdx");
  const aboutMdx = path.join(mdxDir, "about.mdx")

  return await readMdx(aboutMdx)
}
export default async function AboutPage() {
  const about = await loadAboutPage();

  return (
    <section className="py-3 xcontainer">
      <article className="mx-auto prose md:prose-md lg:prose-md xl:prose-md text-foreground prose-headings:text-accent-foreground prose-blockquote:text-muted-foreground prose-a:text-blue-500">
        <h1 className="my-2">{about.metadata.title}</h1>
        {about.content}
      </article>
    </section>
  );
}
