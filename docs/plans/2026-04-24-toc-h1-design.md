# Add H1 (Article Title) to Table of Contents

## Problem

The TOC only shows h2 and h3 headings. When a reader is in the first section (before encountering any h2/h3), no TOC entry is highlighted, creating the impression that the current position isn't represented.

## Decision

Prepend the article title as a synthetic h1 entry in the TOC. The article title is rendered as an `<h1>` in the page header, so we add a matching `id` so the TOC can scroll to it. MDX body h1 headings are not included (only 2 of 9 posts use them, and they'd create confusion with the title h1).

## Changes

1. **`src/lib/mdx-content.ts`** — Change `Heading.level` type from `2 | 3` to `1 | 2 | 3`. `extractHeadings` regex stays h2/h3 only — the title h1 is injected by the page component.

2. **`src/app/b/[slug]/page.tsx`** — Add a synthetic `{ text: title, id, level: 1 }` heading at the start of the headings array. Add an `id` attribute to the article `<h1>` element so the TOC can scroll to it. Change the "hide when ≤1 heading" threshold to `headings.length === 0` since we always have the title entry.

3. **`src/components/toc.tsx`** — Update `Heading` interface to `level: 1 | 2 | 3`. Adjust indent: h1 = no indent (`pl-0`), h2 = `pl-4`, h3 = `pl-8`. Update `toc-mobile.tsx` interface similarly.