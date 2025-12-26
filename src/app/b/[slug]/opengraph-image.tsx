import { ImageResponse } from 'next/og';
import { getAllPosts } from '@/lib/mdx-content';
import { siteConfig } from '@/lib/config';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate static params for all posts at build time
export { generateStaticParams } from './page';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  
  // Load fonts from local files
  const [interBold, interMedium] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Inter-Bold.woff')),
    readFile(join(process.cwd(), 'public/fonts/Inter-Medium.woff')),
  ]);
  
  // Fetch post data
  const posts = await getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);

  const title = post?.metadata.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = post?.metadata.description || '';
  const author = post?.metadata.author || siteConfig.author.name;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          position: 'relative',
          fontFamily: 'Inter',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 40%)',
            display: 'flex',
          }}
        />

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-50px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-40px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '50px 70px',
            position: 'relative',
          }}
        >
          {/* Top section - Site branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
              }}
            >
              FP
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#e4e4e7',
                  letterSpacing: '-0.01em',
                }}
              >
                {siteConfig.name}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#71717a',
                  fontWeight: 500,
                }}
              >
                Blog Post
              </span>
            </div>
          </div>

          {/* Center section - Title and description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '1000px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? '44px' : title.length > 40 ? '52px' : '58px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #fafafa 0%, #d4d4d8 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: '22px',
                  color: '#71717a',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '850px',
                  fontWeight: 500,
                }}
              >
                {description.length > 130 ? `${description.slice(0, 130)}...` : description}
              </p>
            )}
          </div>

          {/* Bottom section - Author and URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 20px 10px 10px',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {author.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <span
                style={{
                  fontSize: '18px',
                  color: '#e4e4e7',
                  fontWeight: 500,
                }}
              >
                {author}
              </span>
            </div>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'flex' }} />
              <span
                style={{
                  fontSize: '18px',
                  color: '#52525b',
                  fontWeight: 500,
                }}
              >
                fransfp.xyz
              </span>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', display: 'flex' }} />
            </div>
          </div>
        </div>

        {/* Bottom accent line with glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 35%, #a855f7 65%, #ec4899 100%)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interMedium,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
