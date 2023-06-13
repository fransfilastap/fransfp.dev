"use client";

import { TagList } from "@/lib/blog";
import TagPile from "./tag-pile";
import { useSearchParams } from "next/navigation";

export default function Tags({
  values,
  total,
}: {
  values: TagList;
  total: number;
}) {
  const { get } = useSearchParams();
  const filter = get("tag") ?? "";

  return (
    <section className="flex flex-col gap-2 my-4">
      <h2 className="font-sans text-lg">Tags :</h2>
      <div className="flex flex-row w-full gap-2 overflow-x-scroll">
        <TagPile tag="All" count={total} isActive={filter === ""} />
        {Object.keys(values).map((k, v) => (
          <TagPile
            key={`tag-${k}`}
            tag={k}
            count={values[k]}
            isActive={filter.toLowerCase() === k.toLowerCase()}
          />
        ))}
      </div>
    </section>
  );
}
