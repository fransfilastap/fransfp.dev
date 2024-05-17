import { ImageResponse } from 'next/og'
import Meta from "@/config/meta";
import path from 'path'
import { BASE_URL } from '@/config/env'
import { geistMedium } from '@/fonts'
import { allPosts } from '@/lib/content'

// Image metadata
export const alt = "FFP's Website"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {

  const post = (await allPosts()).find((post) => post.metadata.slug === params.slug);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 98,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post?.metadata.title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      headers: {
        "Cache-Control":
          "private, no-cache, no-store, max-age=0, must-revalidate",
      },
    }
  )
}
