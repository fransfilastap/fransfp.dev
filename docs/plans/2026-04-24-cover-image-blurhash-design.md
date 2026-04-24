# Cover Image with BlurHash Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add cover/thumbnail images to blog posts with BlurHash placeholders computed at build time and stored in a JSON file.

**Architecture:** A build-time script reads MDX frontmatter cover paths, computes BlurHash using `blurhash` + `sharp`, and writes `src/data/blurhashes.json`. At runtime, `readMdx()` loads blurhash data for the current slug. A `PostCover` client component renders the image with BlurHash placeholder via Next.js `Image`.

**Tech Stack:** blurhash, sharp, Next.js Image, gray-matter (for script frontmatter parsing)

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install blurhash and sharp**

```bash
pnpm add blurhash
pnpm add -D sharp
```

Note: `sharp` is a dev dependency since it's only needed by the build script. `blurhash` is needed at runtime for decoding.

**Step 2: Verify installation**

```bash
pnpm ls blurhash sharp
```

Expected: Both packages listed with versions.

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add blurhash and sharp dependencies"
```

---

### Task 2: Create the BlurHash generation script

**Files:**
- Create: `scripts/generate-blurhashes.mjs`
- Create: `src/data/blurhashes.json` (generated output)

**Step 1: Write the script**

Create `scripts/generate-blurhashes.mjs`:

```javascript
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { encode } from "blurhash";

const CONTENTS_DIR = path.join(process.cwd(), "src", "contents");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_PATH = path.join(process.cwd(), "src", "data", "blurhashes.json");

async function getBlurhash(imagePath) {
    const { data, info } = await sharp(imagePath)
        .raw()
        .ensureAlpha()
        .resize(100, 100, { fit: "inside" })
        .toBuffer({ resolveWithObject: true });

    const hash = encode(
        new Uint8ClampedArray(data),
        info.width,
        info.height,
        4,
        3
    );

    return {
        hash,
        width: info.width,
        height: info.height,
    };
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split("\n");
    for (const line of lines) {
        const lineMatch = line.match(/^(\w+):\s*(.+)$/);
        if (lineMatch) {
            const [, key, value] = lineMatch;
            frontmatter[key] = value.replace(/^['"]|['"]$/g, "");
        }
    }
    return frontmatter;
}

async function main() {
    const files = fs.readdirSync(CONTENTS_DIR).filter((f) => f.endsWith(".mdx"));
    const result = {};

    for (const file of files) {
        const filePath = path.join(CONTENTS_DIR, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const frontmatter = parseFrontmatter(content);

        if (!frontmatter.cover) {
            console.log(`  Skipping ${file} (no cover)`);
            continue;
        }

        const coverPath = frontmatter.cover.startsWith("/")
            ? path.join(PUBLIC_DIR, frontmatter.cover)
            : path.join(PUBLIC_DIR, frontmatter.cover);

        if (!fs.existsSync(coverPath)) {
            console.warn(`  Warning: Cover not found for ${file}: ${coverPath}`);
            continue;
        }

        const slug = file.replace(/\.mdx$/, "");

        try {
            const blurhashData = await getBlurhash(coverPath);
            result[slug] = blurhashData;
            console.log(`  Generated blurhash for ${slug}`);
        } catch (err) {
            console.error(`  Error processing ${slug}:`, err.message);
        }
    }

    const dataDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + "\n");
    console.log(`\nWrote ${Object.keys(result).length} entries to ${OUTPUT_PATH}`);
}

main().catch(console.error);
```

**Step 2: Add the script to package.json**

In `package.json`, add to scripts:

```json
"generate-blurhashes": "node scripts/generate-blurhashes.mjs",
"prebuild": "node scripts/generate-blurhashes.mjs"
```

The `prebuild` hook ensures blurhashes are regenerated before every `next build`.

**Step 3: Run the script**

```bash
pnpm generate-blurhashes
```

Expected: Script reads all MDX files, generates BlurHash for each cover, writes `src/data/blurhashes.json`.

**Step 4: Verify generated JSON**

```bash
cat src/data/blurhashes.json
```

Expected: JSON with slug keys mapping to `{ hash, width, height }`.

**Step 5: Commit**

```bash
git add scripts/generate-blurhashes.mjs src/data/blurhashes.json package.json
git commit -m "feat: add blurhash generation script and generated data"
```

---

### Task 3: Load BlurHash data in mdx-content.ts

**Files:**
- Modify: `src/lib/mdx-content.ts`

**Step 1: Add blurhash data loading**

At the top of `src/lib/mdx-content.ts`, import the JSON data:

```ts
import blurhashData from '@/data/blurhashes.json';
```

Add the blurhash data to the `Frontmatter` interface. Actually, it doesn't belong in Frontmatter (it's generated, not authored). Add it to the `MdxContent` return instead. Add a `BlurhashInfo` type:

```ts
export interface BlurhashInfo {
    hash: string;
    width: number;
    height: number;
}

export interface MdxContent {
    metadata: Frontmatter;
    content: never;
    compiledSource: MDXRemoteSerializeResult;
    rawSource: string;
    headings: Heading[];
    blurhash?: BlurhashInfo;
};
```

**Step 2: Attach blurhash and cover to the return value**

In the `readMdx` function, after extracting the slug, look up blurhash data:

```ts
const blurhash = blurhashData[slug as keyof typeof blurhashData] as BlurhashInfo | undefined;
```

Add `blurhash` to the return object and ensure `cover` is passed through from frontmatter (it's already in Frontmatter as `cover?: string`):

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
        cover: frontmatter.cover,
    },
    content: content,
    rawSource: fileContents,
    headings,
    blurhash,
} as MdxContent;
```

Note: `frontmatter.cover` is already typed as `cover?: string` in the `Frontmatter` interface, so we just need to make sure it's included in the metadata return. Check that the metadata mapping includes `cover`.

**Step 3: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: No new type errors.

**Step 4: Commit**

```bash
git add src/lib/mdx-content.ts
git commit -m "feat: load blurhash data and cover path in mdx-content"
```

---

### Task 4: Create the PostCover component

**Files:**
- Create: `src/components/post-cover.tsx`

**Step 1: Write the PostCover component**

Create `src/components/post-cover.tsx`:

```tsx
'use client';

import Image from "next/image";
import { decode } from "blurhash";

interface PostCoverProps {
    src: string;
    blurhash: string;
    width: number;
    height: number;
    alt: string;
}

function decodeBlurhashToDataUrl(hash: string, width: number, height: number): string {
    const pixels = decode(hash, width, height);
    const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
    if (!canvas) return '';

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

export function PostCover({ src, blurhash, width, height, alt }: PostCoverProps) {
    const blurDataUrl = decodeBlurhashToDataUrl(blurhash, width, height);

    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                placeholder={blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={blurDataUrl || undefined}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
            />
        </div>
    );
}
```

Note: We decode BlurHash to a data URL client-side since Next.js `blurDataURL` requires a data URL string, not a raw BlurHash. The `priority` prop is set because the cover is likely above the fold and LCP-critical.

**Step 2: Commit**

```bash
git add src/components/post-cover.tsx
git commit -m "feat: add PostCover component with BlurHash placeholder"
```

---

### Task 5: Integrate PostCover into the blog post page

**Files:**
- Modify: `src/app/b/[slug]/page.tsx`

**Step 1: Import PostCover and pass cover data**

Add import at top of `src/app/b/[slug]/page.tsx`:

```ts
import { PostCover } from '@/components/post-cover';
```

**Step 2: Render PostCover in the article header**

In the article header section, between the meta info div and the h1 title, add the PostCover:

After the meta info div and before the `<h1>`:

```tsx
{/* Cover Image */}
{post.metadata.cover && post.blurhash && (
    <PostCover
        src={post.metadata.cover}
        blurhash={post.blurhash.hash}
        width={post.blurhash.width}
        height={post.blurhash.height}
        alt={post.metadata.title}
    />
)}
```

**Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Blog posts with covers show the image.

**Step 4: Commit**

```bash
git add "src/app/b/[slug]/page.tsx"
git commit -m "feat: integrate PostCover into blog post page"
```

---

### Task 6: Verify end-to-end and add Next.js Image config

**Files:**
- Modify: `next.config.ts` (if needed for remote image patterns)

**Step 1: Check if any covers use remote URLs or paths outside /public**

The cover paths in frontmatter look like `/media/...` or `/posts/...` which are served from `/public`. Some covers reference `/posts/` which may be external (from a CDN like Cloudinary). Check:

```bash
grep -r "cover:" src/contents/*.mdx
```

If any covers reference external URLs (starting with `https://`), we need to add those domains to `next.config.ts` `images.remotePatterns`. If all are local `/public` paths, no config changes needed.

**Step 2: Check current next.config.ts for images config**

Read `next.config.ts`. If it already has an `images` config, add the remote patterns. If not, and all covers are local, skip this step.

**Step 3: Run the full build with blurhash generation**

```bash
pnpm generate-blurhashes && pnpm build
```

**Step 4: Visual verification**

```bash
pnpm dev
```

Open a blog post with a cover image (e.g., `membangun-kultur-melawan-bus-factor`). Verify:
- Cover image appears between meta info and title
- BlurHash placeholder shows during loading
- Image has proper aspect ratio (16:9)
- Image is rounded with subtle styling
- Posts without covers show no image element

**Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: polish cover image integration"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install blurhash + sharp | `package.json` |
| 2 | Create generation script | `scripts/generate-blurhashes.mjs`, `src/data/blurhashes.json`, `package.json` |
| 3 | Load blurhash data in mdx-content | `src/lib/mdx-content.ts` |
| 4 | Create PostCover component | `src/components/post-cover.tsx` |
| 5 | Integrate into blog page | `src/app/b/[slug]/page.tsx` |
| 6 | Verify and configure images | `next.config.ts` (if needed) |