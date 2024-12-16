import type { MDXComponents } from "mdx/types";
import {components as MdxComponents} from "@/components/mdx/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...MdxComponents,
        ...components,
    };
}