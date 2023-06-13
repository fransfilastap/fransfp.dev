"use client";

import clsxm from "@/helpers/clsxm";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, MouseEventHandler, useCallback, useRef } from "react";

export default function TagPile({
  tag,
  count = 0,
  isActive = false,
}: {
  tag: string;
  count?: number;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { push, replace } = useRouter();

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        if (tag.toLowerCase() === "all") {
          replace("blog");
        } else {
          push(`blog?tag=${tag}`);
        }
      }}
      className={clsxm(
        "flex flex-row max-w-[500px] hover:bg-[var(--primary-color)] hover:text-white items-center justify-between px-2 py-1 rounded-full text-xs border border-black text-black uppercase font-heading",
        {
          "bg-[var(--primary-color)] text-white": isActive,
        }
      )}
    >
      <span className="text-ellipsis line-clamp-1">{tag}</span>
      <span className="px-3 mx-2 border rounded-full">{count}</span>
    </button>
  );
}
