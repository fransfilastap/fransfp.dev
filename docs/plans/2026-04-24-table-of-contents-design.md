# Table of Contents with Scroll-Tracking Animation

## Decision

**Approach**: rehype-slug + server-side heading extraction (Approach A)

Add a sticky left sidebar table of contents on desktop and a mobile drawer for blog posts. Active heading is tracked via IntersectionObserver and highlighted with a sliding left-border indicator.

## Architecture

### New Dependencies

- `rehype-slug` — auto-generates `id` attributes on heading elements

### New Files

- `src/components/toc.tsx` — Client component: renders TOC links, tracks active heading with IntersectionObserver, sliding indicator animation
- `src/components/toc-mobile.tsx` — Mobile drawer wrapper: floating button + slide-up drawer with backdrop

### Modified Files

- `src/lib/mdx-content.ts` — Add `rehype-slug` plugin to rehype pipeline, extract headings from raw MDX source, add `headings` to `MdxContent` interface
- `src/app/b/[slug]/page.tsx` — Restructure layout to include TOC sidebar (desktop) and mobile drawer
- `src/app/globals.css` — TOC-specific styles (indicator animation, drawer transition)

## Data Flow

1. `readMdx()` extracts headings (`text`, `id`, `level`) from raw MDX source using regex (before compilation)
2. Headings returned in `MdxContent.headings` array
3. `page.tsx` passes `headings` as prop to `TableOfContents` client component
4. `rehype-slug` in the MDX pipeline ensures rendered headings get matching `id` attributes
5. On client, `IntersectionObserver` watches heading elements and updates active state

## Component Design

### TableOfContents (Client Component)

**Props**: `{ headings: { text: string; id: string; level: 2 | 3 }[] }`

- Vertical list of heading links, indented for h3s
- IntersectionObserver with `rootMargin: '-80px 0px -70% 0px'`
- Active heading highlighted with a sliding left border indicator (2px solid, transitions `top` and `height` via CSS 0.2s ease)
- Click handler: smooth-scrolls to heading + updates URL hash
- If ≤1 heading, component renders nothing (null)

### Slugify Function

Must match rehype-slug's output: lowercase, replace non-alphanumeric with `-`, deduplicate by appending `-1`, `-2`, etc.

### Layout

**Desktop (≥1024px / lg breakpoint)**:
- Flex container: TOC sidebar (`w-64 shrink-0`) on left, article (`flex-1`) on right
- TOC: `sticky top-24`, `max-h-[calc(100vh-8rem)]`, `overflow-y-auto`

**Mobile (<1024px)**:
- TOC hidden; floating button (bottom-right) opens a bottom drawer
- Drawer slides up with backdrop overlay
- Clicking a heading scrolls and closes drawer

## Edge Cases

- Short posts (≤1 heading): TOC not rendered
- Special characters in headings: slugify function mirrors rehype-slug behavior
- Scroll offset: `scroll-margin-top` on headings to account for fixed header
- Performance: IntersectionObserver with `threshold: 0`, disconnect on unmount