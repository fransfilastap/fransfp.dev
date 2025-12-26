import type {Metadata} from "next";
import {Geist, JetBrains_Mono, Lora} from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {ThemeProvider} from "@/components/theme-provider";
import {getAllPosts} from "@/lib/mdx-content";
import {generatePersonJsonLd, generateWebsiteJsonLd} from "@/lib/json-ld";
import {siteConfig} from "@/lib/config";

const geist = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["software engineering", "web development", "blog", "technology", "programming"],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.name,
        description: siteConfig.description,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: siteConfig.author.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: siteConfig.url,
    },
};

// Get posts for search
async function getSearchPosts() {
    try {
        const posts = await getAllPosts();
        return posts.map((post) => ({
            title: post.metadata.title || "",
            description: post.metadata.description || "",
            slug: post.metadata.slug || "",
            date: post.metadata.date instanceof Date 
                ? post.metadata.date.toISOString() 
                : typeof post.metadata.date === 'string' 
                    ? post.metadata.date 
                    : "",
        }));
    } catch {
        return [];
    }
}

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const posts = await getSearchPosts();
    const personJsonLd = generatePersonJsonLd();
    const websiteJsonLd = generateWebsiteJsonLd();
    
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
        </head>
        <body className={`${geist.variable} ${jetBrainsMono.variable} ${lora.variable} antialiased`}>
        <ThemeProvider>
            <Header posts={posts}/>
            <main className="min-h-screen">{children}</main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
