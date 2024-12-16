import Link from "next/link";
import {Tweet} from "react-tweet";
import Image from "next/image";

export const components = {
    Link: Link,
    Tweet: Tweet,
    'h1' : ({children}: {children: React.ReactNode}) => <h1 className="text-3xl font-bold">{children}</h1>,
    'h2' : ({children}: {children: React.ReactNode}) => <h2 className="text-2xl font-bold">{children}</h2>,
    'h3' : ({children}: {children: React.ReactNode}) => <h3 className="text-xl font-bold">{children}</h3>,
    'h4' : ({children}: {children: React.ReactNode}) => <h4 className="text-lg font-bold">{children}</h4>,
    'h5' : ({children}: {children: React.ReactNode}) => <h5 className="text-base font-bold">{children}</h5>,
    'h6' : ({children}: {children: React.ReactNode}) => <h6 className="text-sm font-bold">{children}</h6>,
    'a' : ({children, href}: {children: React.ReactNode, href: string}) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
    Image: Image
}