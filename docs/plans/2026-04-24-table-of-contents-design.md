# Table of Contents Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a scroll-tracking table of contents with a sliding indicator animation to blog posts — desktop sticky sidebar on the left, mobile drawer from bottom.

**Architecture:** Server-side heading extraction via regex on raw MDX + rehype-slug for heading IDs. Client-side IntersectionObserver tracks the active heading. A CSS-transitioned left-border indicator slides between active links.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, rehype-slug, IntersectionObserver API

---

### Task 1: Install rehype-slug

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

```bash
pnpm add rehype-slug
```

**Step 2: Verify installation**

```bash
pnpm ls rehype-slug
```

Expected: rehype-slug listed with version

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add rehype-slug dependency"
```

---

### Task 2: Add slugify function and heading extraction to mdx-content.ts

**Files:**
- Modify: `src/lib/mdx-content.ts`

**Step 1: Add the `Heading` type and `slugify` function**

Add at the top of `src/lib/mdx-content.ts`, after the existing imports:

```ts
export interface Heading {
    text: string;
    id: string;
    level: 2 | 3;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function extractHeadings(rawSource: string): Heading[] {
    const lines = rawSource.split('\n');
    const headings: Heading[] = [];
    const idCounts: Record<string, number> = {};

    for (const line of lines) {
        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (!match) continue;

        const level = match[1].length as 2 | 3;
        const text = match[2].replace(/\*+|`+|~~+/g, '').trim();
        let id = slugify(text);

        if (idCounts[id] !== undefined) {
            idCounts[id]++;
            id = `${id}-${idCounts[id]}`;
        } else {
            idCounts[id] = 0;
        }

        headings.push({ text, id, level });
    }

    return headings;
}
```

Note: `extractHeadings` strips markdown inline formatting (`*bold*`, `` `code` `), lowercases, and deduplicates IDs the same way rehype-slug does.

**Step 2: Add `headings` to the `MdxContent` interface**

In `src/lib/mdx-content.ts`, update the `MdxContent` interface:

```ts
export interface MdxContent {
    metadata: Frontmatter;
    content: never;
    compiledSource: MDXRemoteSerializeResult;
    rawSource: string;
    headings: Heading[];
};
```

**Step 3: Add rehype-slug to the rehype pipeline**

Add the import at the top:

```ts
import rehypeSlug from 'rehype-slug';
```

Add `rehypeSlug` to the `rehypePlugins` array in `readMdx`:

```ts
rehypePlugins: [
    rehypeSlug,
    rehypeMDXImportMedia, 
    [rehypePrettyCode, rehypePrettyCodeOptions]
],
```

**Step 4: Extract headings and return them from `readMdx`**

In `readMdx`, add heading extraction before the `compileMDX` call and include it in the return:

```ts
const headings = extractHeadings(fileContents);
```

And add `headings` to the return object:

```ts
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
    headings,
} as MdxContent;
```

**Step 5: Verify types compile**

```bash
pnpm exec tsc --noEmit
```

Expected: No type errors related to `mdx-content.ts`

**Step 6: Commit**

```bash
git add src/lib/mdx-content.ts
git commit -m "feat: add heading extraction and rehype-slug to MDX pipeline"
```

---

### Task 3: Add scroll-margin-top to headings in globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add scroll-margin-top rule**

At the end of `src/app/globals.css`, add:

```css
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
    scroll-margin-top: 5rem;
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add scroll-margin-top to prose headings"
```

---

### Task 4: Create the TableOfContents client component

**Files:**
- Create: `src/components/toc.tsx`

**Step 1: Write the TableOfContents component**

Create `src/components/toc.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Heading {
    text: string;
    id: string;
    level: 2 | 3;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const isClickScrolling = useRef(false);

    const updateIndicator = useCallback((id: string) => {
        const link = linkRefs.current[id];
        if (link) {
            setIndicatorStyle({
                top: link.offsetTop,
                height: link.offsetHeight,
            });
        }
    }, []);

    useEffect(() => {
        if (headings.length <= 1) return;

        const observers: IntersectionObserver[] = [];

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isClickScrolling.current) {
                            setActiveId(heading.id);
                            updateIndicator(heading.id);
                        }
                    });
                },
                {
                    rootMargin: '-80px 0px -70% 0px',
                    threshold: 0,
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, [headings, updateIndicator]);

    useEffect(() => {
        if (headings.length > 0 && !activeId) {
            const firstId = headings[0].id;
            setActiveId(firstId);
            updateIndicator(firstId);
        }
    }, [headings, activeId, updateIndicator]);

    const handleClick = (id: string) => {
        isClickScrolling.current = true;
        setActiveId(id);
        updateIndicator(id);

        setTimeout(() => {
            isClickScrolling.current = false;
        }, 1000);
    };

    if (headings.length <= 1) return null;

    return (
        <nav aria-label="Table of contents">
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">
                On this page
            </h4>
            <div className="relative">
                {activeId && (
                    <div
                        className="absolute left-0 w-[2px] bg-[var(--primary)] rounded-full transition-all duration-200 ease-out"
                        style={{
                            top: indicatorStyle.top,
                            height: indicatorStyle.height,
                        }}
                    />
                )}
                <ul className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                ref={(el) => { linkRefs.current[heading.id] = el; }}
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(heading.id);
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                        history.pushState(null, '', `#${heading.id}`);
                                    }
                                }}
                                className={`
                                    block py-1.5 text-sm transition-colors duration-200
                                    ${heading.level === 3 ? 'pl-4' : ''}
                                    ${activeId === heading.id
                                        ? 'text-[var(--foreground)] font-medium pl-4'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] pl-4'
                                    }
                                `}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/toc.tsx
git commit -m "feat: add TableOfContents client component with scroll tracking"
```

---

### Task 5: Create the mobile TOC drawer component

**Files:**
- Create: `src/components/toc-mobile.tsx`

**Step 1: Write the MobileToc component**

Create `src/components/toc-mobile.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { TableOfContents } from './toc';

interface Heading {
    text: string;
    id: string;
    level: 2 | 3;
}

interface MobileTocProps {
    headings: Heading[];
}

export function MobileToc({ headings }: MobileTocProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (headings.length <= 1) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 lg:hidden w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center"
                aria-label="Open table of contents"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v11a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 15.5v-11zM4.5 4a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-11z" clipRule="evenodd" />
                    <path d="M6 7.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM6 10a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Table of contents"
                >
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border-color)] rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto animate-toc-drawer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
                                On this page
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md hover:bg-[var(--surface)] transition-colors"
                                aria-label="Close table of contents"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[var(--text-secondary)]">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </div>
                        <TableOfContents headings={headings} />
                    </div>
                </div>
            )}
        </>
    );
}
```

**Step 2: Add drawer animation to globals.css**

At the end of `src/app/globals.css`, add:

```css
@keyframes toc-drawer {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

.animate-toc-drawer {
    animation: toc-drawer 0.3s ease-out;
}
```

**Step 3: Commit**

```bash
git add src/components/toc-mobile.tsx src/app/globals.css
git commit -m "feat: add mobile TOC drawer component with slide-up animation"
```

---

### Task 6: Update the blog post page layout

**Files:**
- Modify: `src/app/b/[slug]/page.tsx`

**Step 1: Update imports**

Add imports at the top of `src/app/b/[slug]/page.tsx`:

```ts
import { TableOfContents } from '@/components/toc';
import { MobileToc } from '@/components/toc-mobile';
```

**Step 2: Extract headings from post data**

After `const readingTime = ...` line, add:

```ts
const headings = post.headings || [];
```

**Step 3: Restructure the layout**

Replace the `<article className="max-w-3xl mx-auto px-6">` section with a flex layout that includes the TOC sidebar. The new return JSX:

```tsx
return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        />
        <div className="max-w-6xl mx-auto px-6 lg:flex lg:gap-12">
            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block lg:w-64 lg:shrink-0">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <TableOfContents headings={headings} />
                </div>
            </aside>

            {/* Article Content */}
            <article className="lg:flex-1 min-w-0">
                {/* Article Header */}
                <header className="py-12 md:py-16">
                    {/* ... existing header content stays exactly the same ... */}
                </header>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mb-12"></div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none pb-16">
                    {post.content}
                </div>

                {/* Footer */}
                <footer className="py-12 border-t border-[var(--border-color)]">
                    {/* ... existing footer content stays exactly the same ... */}
                </footer>
            </article>
        </div>

        {/* Mobile TOC */}
        <MobileToc headings={headings} />
    </>
)
```

The key change: wrapping the entire layout in a `max-w-6xl` flex container with the TOC sidebar as `<aside>` and the article as `flex-1`. The `<article>` no longer has `max-w-3xl mx-auto` — the `max-w-6xl` on the parent container constrains the overall width.

Inside the `<article>`, add `min-w-0` to prevent flex overflow.

The header and footer content remain exactly the same — only the outer wrapping divs change.

**Step 4: Verify the build**

```bash
pnpm build
```

Expected: Build succeeds without errors.

**Step 5: Commit**

```bash
git add src/app/b/[slug]/page.tsx
git commit -m "feat: integrate TOC sidebar and mobile drawer into blog post layout"
```

---

### Task 7: Visual polish and testing

**Step 1: Run dev server and visually verify**

```bash
pnpm dev
```

Check the following:
- Any blog post with h2/h3 headings shows the TOC sidebar on desktop (≥1024px)
- Clicking a TOC link smooth-scrolls to the heading and updates the URL hash
- Scrolling through the article updates the active indicator
- The indicator slides smoothly between headings
- Mobile: floating button appears, clicking opens drawer, clicking a heading scrolls and closes drawer
- Posts with ≤1 heading show no TOC
- Dark mode works correctly for all TOC elements

**Step 2: Run linter**

```bash
pnpm lint
```

Expected: No linting errors.

**Step 3: Run type checker**

```bash
pnpm exec tsc --noEmit
```

Expected: No type errors.

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: polish TOC styles and fix any issues"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install rehype-slug | `package.json` |
| 2 | Add heading extraction + slugify | `src/lib/mdx-content.ts` |
| 3 | Add scroll-margin-top CSS | `src/app/globals.css` |
| 4 | Create TableOfContents component | `src/components/toc.tsx` |
| 5 | Create mobile drawer component | `src/components/toc-mobile.tsx`, `src/app/globals.css` |
| 6 | Update blog post layout | `src/app/b/[slug]/page.tsx` |
| 7 | Visual polish & testing | All |