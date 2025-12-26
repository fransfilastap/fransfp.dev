import Link from "next/link";
import {Tweet} from "react-tweet";
import Image from "next/image";
import React from "react";
import { CodeBlock } from "./code-block";

export const components = {
    Link: Link,
    Tweet: Tweet,
    Image: Image,
    
    // Headings with proper Medium-style typography
    h1: ({children}: {children: React.ReactNode}) => (
        <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-4 tracking-tight">
            {children}
        </h1>
    ),
    h2: ({children}: {children: React.ReactNode}) => (
        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 tracking-tight">
            {children}
        </h2>
    ),
    h3: ({children}: {children: React.ReactNode}) => (
        <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3 tracking-tight">
            {children}
        </h3>
    ),
    h4: ({children}: {children: React.ReactNode}) => (
        <h4 className="text-lg md:text-xl font-bold mt-6 mb-2">
            {children}
        </h4>
    ),
    h5: ({children}: {children: React.ReactNode}) => (
        <h5 className="text-base md:text-lg font-bold mt-4 mb-2">
            {children}
        </h5>
    ),
    h6: ({children}: {children: React.ReactNode}) => (
        <h6 className="text-sm md:text-base font-bold mt-4 mb-2 uppercase tracking-wide text-[var(--text-secondary)]">
            {children}
        </h6>
    ),
    
    // Links with subtle underline and blue color
    a: ({children, href}: {children: React.ReactNode, href: string}) => (
        <a 
            href={href} 
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noreferrer' : undefined}
            className="text-[var(--primary)] underline underline-offset-2 decoration-[var(--primary)]/30 hover:decoration-[var(--primary)] transition-colors"
        >
            {children}
        </a>
    ),
    
    // Blockquote with gradient left border
    blockquote: ({children}: {children: React.ReactNode}) => (
        <blockquote className="relative border-l-4 border-[var(--primary)] pl-6 my-8 italic text-[var(--text-secondary)] bg-[var(--surface)] py-4 pr-4 rounded-r-lg">
            {children}
        </blockquote>
    ),
    
    // Horizontal rule with gradient
    hr: () => (
        <div className="my-12 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
        </div>
    ),
    
    // Lists
    ul: ({children}: {children: React.ReactNode}) => (
        <ul className="my-6 space-y-2 list-disc list-outside ml-6 marker:text-[var(--primary)]">
            {children}
        </ul>
    ),
    ol: ({children}: {children: React.ReactNode}) => (
        <ol className="my-6 space-y-2 list-decimal list-outside ml-6 marker:text-[var(--primary)]">
            {children}
        </ol>
    ),
    li: ({children}: {children: React.ReactNode}) => (
        <li className="leading-relaxed">
            {children}
        </li>
    ),
    
    // Enhanced code blocks with title support
    // The 'figure' element wraps code blocks from rehype-pretty-code
    figure: ({ children, ...props }: { children: React.ReactNode; "data-rehype-pretty-code-figure"?: string }) => {
        // Check if this is a code block figure
        if (props["data-rehype-pretty-code-figure"] !== undefined) {
            return (
                <figure className="code-figure my-6" {...props}>
                    {children}
                </figure>
            );
        }
        return <figure {...props}>{children}</figure>;
    },
    
    // The 'figcaption' contains the title
    figcaption: ({ children, ...props }: { children: React.ReactNode; "data-rehype-pretty-code-title"?: string }) => {
        if (props["data-rehype-pretty-code-title"] !== undefined) {
            return (
                <figcaption className="code-block-title flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] border-b border-white/10 rounded-t-xl text-sm font-mono text-gray-300" {...props}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-400"
                    >
                        <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
                    </svg>
                    {children}
                </figcaption>
            );
        }
        return <figcaption {...props}>{children}</figcaption>;
    },
    
    // Pre element with copy button
    pre: ({ children, ...props }: { children: React.ReactNode; raw?: string; "data-language"?: string }) => {
        return (
            <CodeBlock showLineNumbers={true}>
                <pre {...props}>{children}</pre>
            </CodeBlock>
        );
    },
}