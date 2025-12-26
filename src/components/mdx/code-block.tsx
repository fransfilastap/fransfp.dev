"use client";

import { CopyButton } from "./copy-button";
import { ReactNode, Children, isValidElement, ReactElement } from "react";

interface CodeBlockProps {
  children: ReactNode;
  title?: string;
  showLineNumbers?: boolean;
}

// Extract text content from React children
function extractTextContent(children: ReactNode): string {
  let text = "";
  
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      text += child;
    } else if (typeof child === "number") {
      text += String(child);
    } else if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      if (element.props.children) {
        text += extractTextContent(element.props.children);
      }
    }
  });
  
  return text;
}

export function CodeBlock({ children, title, showLineNumbers = true }: CodeBlockProps) {
  const codeContent = extractTextContent(children);
  
  return (
    <div className="code-block-wrapper group relative my-6">
      {/* Title bar */}
      {title && (
        <div className="code-block-title flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-white/10 rounded-t-xl">
          <div className="flex items-center gap-2">
            {/* File icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
            </svg>
            <span className="text-sm font-mono text-gray-300">{title}</span>
          </div>
          <CopyButton code={codeContent} />
        </div>
      )}
      
      {/* Code content */}
      <div className={`relative ${title ? 'rounded-t-none' : ''}`}>
        {/* Copy button (if no title) */}
        {!title && (
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <CopyButton code={codeContent} />
          </div>
        )}
        
        {/* Line numbers indicator */}
        <div className={showLineNumbers ? "code-with-line-numbers" : ""}>
          {children}
        </div>
      </div>
    </div>
  );
}
