import { CLOUDINARY_CLOUD_NAME } from '@/config/env';
import { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src:string) => src[0] === '/' ? src.slice(1) : src

export default function cloudinary({ src,width,quality}:ImageLoaderProps) {
	const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
}