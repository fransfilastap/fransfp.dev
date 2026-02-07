import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const slugify = (text) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
		.replace(/\-\-+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
};

rl.question("Enter blog post title: ", (title) => {
	const slug = slugify(title);
	const date = new Date().toISOString().split("T")[0];

	const contentDir = path.join(process.cwd(), "src", "contents");
	const publicMediaDir = path.join(process.cwd(), "public", "media");

	const mdxPath = path.join(contentDir, `${slug}.mdx`);
	const assetDir = path.join(publicMediaDir, slug);

	// Check if file already exists
	if (fs.existsSync(mdxPath)) {
		console.error(
			`Error: Post with slug "${slug}" already exists at ${mdxPath}`,
		);
		rl.close();
		process.exit(1);
	}

	// Create asset directory
	if (!fs.existsSync(assetDir)) {
		fs.mkdirSync(assetDir, { recursive: true });
		console.log(`Created asset directory: ${assetDir}`);
	}

	// Create MDX file
	const frontmatter = `---
slug: ${slug}
title: "${title}"
date: ${date}
author: Frans Filasta Pratama
cover: /media/${slug}/cover.jpg
description: "Description for ${title}"
tags: []
lastmod: ${date}
---

Write your content here...
`;

	fs.writeFileSync(mdxPath, frontmatter);
	console.log(`Created MDX file: ${mdxPath}`);

	rl.close();
});
