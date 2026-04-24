'use client';

import Image from "next/image";
import { decode } from "blurhash";

interface PostCoverProps {
    src: string;
    blurhash: string;
    width: number;
    height: number;
    alt: string;
}

function decodeBlurhashToDataUrl(hash: string, width: number, height: number): string {
    const pixels = decode(hash, width, height);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

export function PostCover({ src, blurhash, width, height, alt }: PostCoverProps) {
    const blurDataUrl = decodeBlurhashToDataUrl(blurhash, width, height);

    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                placeholder={blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={blurDataUrl || undefined}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
            />
        </div>
    );
}