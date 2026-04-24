import Image from "next/image";

interface PostCoverProps {
    src: string;
    blurDataUrl: string;
    alt: string;
}

export function PostCover({ src, blurDataUrl, alt }: PostCoverProps) {
    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
            />
        </div>
    );
}