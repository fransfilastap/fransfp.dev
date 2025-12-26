import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = siteConfig.name;
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
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            display: 'flex',
          }}
        />
        
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Main content - centered */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '60px 80px',
            position: 'relative',
            gap: '28px',
          }}
        >
          {/* Logo/Avatar */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '56px',
              fontWeight: 700,
              color: 'white',
              boxShadow: '0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(168, 85, 247, 0.2)',
              border: '4px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            FP
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.03em',
              margin: 0,
              textAlign: 'center',
            }}
          >
            {siteConfig.name}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: '#71717a',
              margin: 0,
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Software Engineer
          </p>

          {/* URL with decorative dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'flex' }} />
            <span
              style={{
                fontSize: '22px',
                color: '#52525b',
                fontWeight: 500,
              }}
            >
              fransfp.xyz
            </span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', display: 'flex' }} />
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
