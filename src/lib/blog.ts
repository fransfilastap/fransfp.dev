import { Blog, allBlogs } from "contentlayer/generated";
import compareDesc from "date-fns/compareDesc";

export type TagList = Record<string, number>;
export type PostAndTagBundle = {
  posts: Blog[];
  tags: TagList;
};

export function getBlogPostandTag(tag?: string|null): PostAndTagBundle {
  let tags: TagList = {};
  const blogs = allBlogs
    .map((e) => {
      if (e.tags) {
        e.tags.forEach((e) => {
          if (Object.values(tags).length >= 1) {
            Object.keys(tags).forEach((k, v) => {
              if (k.toLowerCase() === e.toLowerCase()) {
                tags[k] = tags[k] + 1;
              } else {
                tags[e] = 1;
              }
            });
          } else {
            tags[e] = 1;
          }
        });
      }
      return e;
    })
    .sort((a, b) =>
      compareDesc(new Date(a.date as string), new Date(b.date as string))
    );

  return {
    posts: tag ? blogs.filter((post) => post.tags?.includes(tag)) : blogs,
    tags,
  } as PostAndTagBundle;
}

