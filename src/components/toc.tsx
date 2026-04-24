'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Heading {
    text: string;
    id: string;
    level: 2 | 3;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const isClickScrolling = useRef(false);

    const updateIndicator = useCallback((id: string) => {
        const link = linkRefs.current[id];
        if (link) {
            setIndicatorStyle({
                top: link.offsetTop,
                height: link.offsetHeight,
            });
        }
    }, []);

    useEffect(() => {
        if (headings.length <= 1) return;

        const observers: IntersectionObserver[] = [];

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isClickScrolling.current) {
                            setActiveId(heading.id);
                            updateIndicator(heading.id);
                        }
                    });
                },
                {
                    rootMargin: '-80px 0px -70% 0px',
                    threshold: 0,
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, [headings, updateIndicator]);

    useEffect(() => {
        if (headings.length > 0 && !activeId) {
            const firstId = headings[0].id;
            setActiveId(firstId);
            updateIndicator(firstId);
        }
    }, [headings, activeId, updateIndicator]);

    const handleClick = (id: string) => {
        isClickScrolling.current = true;
        setActiveId(id);
        updateIndicator(id);

        setTimeout(() => {
            isClickScrolling.current = false;
        }, 1000);
    };

    if (headings.length <= 1) return null;

    return (
        <nav aria-label="Table of contents">
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">
                On this page
            </h4>
            <div className="relative">
                {activeId && (
                    <div
                        className="absolute left-0 w-[2px] bg-[var(--primary)] rounded-full transition-all duration-200 ease-out"
                        style={{
                            top: indicatorStyle.top,
                            height: indicatorStyle.height,
                        }}
                    />
                )}
                <ul className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                ref={(el) => { linkRefs.current[heading.id] = el; }}
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(heading.id);
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                        history.pushState(null, '', `#${heading.id}`);
                                    }
                                }}
                                className={`
                                    block py-1.5 text-sm transition-colors duration-200
                                    ${heading.level === 3 ? 'pl-4' : 'pl-4'}
                                    ${activeId === heading.id
                                        ? 'text-[var(--foreground)] font-medium'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                                    }
                                `}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}