'use client';

import { useState } from 'react';
import { TableOfContents } from './toc';

interface Heading {
    text: string;
    id: string;
    level: 1 | 2 | 3;
}

interface MobileTocProps {
    headings: Heading[];
}

export function MobileToc({ headings }: MobileTocProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (headings.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 lg:hidden w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center"
                aria-label="Open table of contents"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v11a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 15.5v-11zM4.5 4a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-11z" clipRule="evenodd" />
                    <path d="M6 7.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM6 10a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Table of contents"
                >
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border-color)] rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto animate-toc-drawer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
                                On this page
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md hover:bg-[var(--surface)] transition-colors"
                                aria-label="Close table of contents"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[var(--text-secondary)]">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </div>
                        <TableOfContents headings={headings} hideHeader />
                    </div>
                </div>
            )}
        </>
    );
}