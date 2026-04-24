# Blog Post Cover Image with BlurHash

## Problem

Blog posts have a `cover` field in frontmatter that is never rendered. Posts need visual cover images with smooth loading using BlurHash placeholders computed at build time.

## Decision

- Cover image displayed at the top of the blog post page (below meta, above title)
- No fallback for posts without covers — render nothing
- BlurHash computed at build time via a Node.js script, stored in JSON
- Uses `blurhash` + `sharp` packages

## Architecture

### New Files

- `scripts/generate-blurhashes.mjs` — Reads all MDX frontmatter, computes BlurHash for each cover image, writes `src/data/blurhashes.json`
- `src/data/blurhashes.json` — Generated artifact: `{ "slug": { "hash": "...", "width": N, "height": N } }`
- `src/components/post-cover.tsx` — Client component rendering the cover with BlurHash placeholder

### Modified Files

- `src/app/b/[slug]/page.tsx` — Import and render `PostCover`
- `src/lib/mdx-content.ts` — Include `cover` in metadata, load blurhash data from JSON

### New devDependencies

- `blurhash` — Encode/decode BlurHash strings
- `sharp` — Image processing for computing BlurHash

## BlurHash Pipeline

1. Developer runs `pnpm generate-blurhashes` (or added to `prebuild` script)
2. Script reads all MDX files from `src/contents/`, parses frontmatter for `cover`
3. For each cover, loads image from `public/<cover>`, decodes with `sharp`, encodes with `blurhash` (4 component X, 3 component Y)
4. Stores image dimensions alongside the hash
5. Writes `src/data/blurhashes.json`
6. At runtime, `readMdx()` loads blurhash data for the current slug from JSON
7. `PostCover` converts BlurHash to a data URL for Next.js `blurDataURL` prop

## PostCover Component

- Renders only when `cover` exists in metadata
- Uses `next/image` with `fill` layout inside a 16:9 aspect ratio container
- BlurHash placeholder converted to data URL for `blurDataURL` prop
- Lazy loaded by default (Next.js Image default)
- Styled: `rounded-xl`, subtle shadow, full-width within article
- Positioned between meta info and title in article header

## No Cover Behavior

- Posts without `cover` in frontmatter: no image element rendered at all
- No gradient placeholder, no default image