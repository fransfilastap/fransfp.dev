import Link, { LinkProps } from 'next/link'
import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  DetailedHTMLProps,
  FunctionComponent,
  ImgHTMLAttributes, ReactElement, ReactNode
} from 'react'
import Image, { ImageProps } from 'next/image'

type CustomLinkProps = ComponentPropsWithoutRef<'a'>;
const CustomLink: FunctionComponent<CustomLinkProps> = (props) => {
  const href = props.href

  if (href?.startsWith('/')) {
    return (
      <Link
        href={href!}
        {...props}
      >
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
}

const RoundedImage: FunctionComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  return (
    <Image
      className={'rounded-lg border border-accent'}
      placeholder="blur"
      src={`${props.src}`}
      alt={props.alt ?? ''}
    />
  )
}

function slugify (str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeadingElement (level: number) {
  const element = (props: { children: ReactNode }): ReactElement => {
    const slug = slugify(props.children as string)
    return React.createElement(`h${level}`, {
        id: slug
      }, [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor'
        })
      ],
      props.children
    )
  }

  element.displayName = `H${level}`
  return element
}

function Strong (props: ComponentPropsWithoutRef<'strong'>) {
  return <strong className="text-foreground" {...props}>{props.children}</strong>
}

export const components = {
  h1: createHeadingElement(1),
  h2: createHeadingElement(2),
  h3: createHeadingElement(3),
  h4: createHeadingElement(4),
  h5: createHeadingElement(5),
  h6: createHeadingElement(6),
  a: CustomLink,
  strong: Strong
}
