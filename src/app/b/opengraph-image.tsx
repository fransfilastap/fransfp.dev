import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Load fonts from local files
  const interBold = await readFile(join(process.cwd(), 'public/fonts/Inter-Bold.woff'));
  const interMedium = await readFile(join(process.cwd(), 'public/fonts/Inter-Medium.woff'));

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
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Decorative floating shapes */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            width: '200px',
            height: '200px',
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
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '60px 80px',
            position: 'relative',
            gap: '24px',
          }}
        >
          {/* Logo/Avatar */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 700,
              color: 'white',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            FP
          </div>

          {/* Blog heading with decorations */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent 0%, #6366f1 100%)',
                borderRadius: '2px',
                display: 'flex',
              }}
            />
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Blog
            </h1>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #a855f7 0%, transparent 100%)',
                borderRadius: '2px',
                display: 'flex',
              }}
            />
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: '#71717a',
              margin: 0,
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Thoughts on software engineering, technology, and life.
          </p>

          {/* Author with decorative elements */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '20px',
              padding: '12px 24px',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', display: 'flex' }} />
            <span
              style={{
                fontSize: '20px',
                color: '#a1a1aa',
                fontWeight: 500,
              }}
            >
              by {siteConfig.author.name}
            </span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', display: 'flex' }} />
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
