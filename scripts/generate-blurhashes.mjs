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