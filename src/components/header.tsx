"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SearchModal } from "./search-modal";

interface HeaderProps {
  posts: {
    title: string;
    description: string;
    slug: string;
    date: string;
  }[];
}

const navItems = [
    {title: 'Home', href: '/'},
    {title: 'Blog', href: '/b'},
]

export default function Header({ posts }: HeaderProps) {
    return (
        <>
            <header className="sticky top-0 py-4 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border-color)] z-50">
                <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
                    <Link 
                        href="/" 
                        className="text-xl font-bold tracking-tight text-[var(--foreground)] hover:opacity-80 transition-opacity"
                    >
                        <span className="gradient-text">FFP</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {/* Search Button */}
                        <button
                            onClick={() => {
                                // Trigger Cmd+K event
                                const event = new KeyboardEvent('keydown', {
                                    key: 'k',
                                    metaKey: true,
                                    ctrlKey: true,
                                    bubbles: true,
                                });
                                document.dispatchEvent(event);
                            }}
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
                            <span className="hidden sm:inline text-[var(--text-muted)]">Search...</span>
                            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium text-[var(--text-muted)] bg-[var(--background)] border border-[var(--border-color)] rounded">
                                ⌘K
                            </kbd>
                        </button>
                        
                        <nav className="flex items-center gap-6">
                            {navItems.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href} 
                                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            
            {/* Search Modal */}
            <SearchModal posts={posts} />
        </>
    );
}
