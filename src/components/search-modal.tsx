"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  description: string;
  slug: string;
  date: string;
}

interface SearchModalProps {
  posts: SearchResult[];
}

export function SearchModal({ posts }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter posts based on query
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts.slice(0, 5);
    
    const lowerQuery = query.toLowerCase();
    return posts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  }, [query, posts]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredPosts]);

  // Handle keyboard shortcut to open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredPosts.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredPosts[selectedIndex]) {
          router.push(`/b/${filteredPosts[selectedIndex].slug}`);
          setIsOpen(false);
          setQuery("");
        }
      }
    },
    [filteredPosts, selectedIndex, router]
  );

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-[var(--background)] rounded-xl shadow-2xl border border-[var(--border-color)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-[var(--text-muted)]"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts..."
            className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none text-base"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] rounded border border-[var(--border-color)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredPosts.length > 0 ? (
            <ul className="py-2">
              {filteredPosts.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/b/${post.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className={`flex flex-col gap-1 px-4 py-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-[var(--primary)] text-white"
                        : "hover:bg-[var(--surface)]"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        index === selectedIndex
                          ? "text-white"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {post.title}
                    </span>
                    <span
                      className={`text-sm line-clamp-1 ${
                        index === selectedIndex
                          ? "text-white/80"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {post.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto mb-3 opacity-50"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-color)] bg-[var(--surface)]">
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[var(--background)] border border-[var(--border-color)] rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-[var(--background)] border border-[var(--border-color)] rounded">↓</kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[var(--background)] border border-[var(--border-color)] rounded">↵</kbd>
              <span className="ml-1">to select</span>
            </span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

// Search trigger button for header
export function SearchButton({ onClick }: { onClick: () => void }) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--text-secondary)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border-color)] rounded-lg transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium bg-[var(--background)] border border-[var(--border-color)] rounded">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  );
}
