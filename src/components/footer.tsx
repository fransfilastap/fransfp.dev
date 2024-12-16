import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center p-4 mt-10 border-t border-t-gray-50 dark:border-t-gray-900 h-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-2">
        <p className="text-xs font-light text-center md:text-left">
          Copyright &copy; 2024 - Frans Filasta P. All rights reserved
        </p>
        <div className="flex gap-2 flex-row justify-center md:justify-start md:flex-row-reverse">
          <Link href="https://github.com/fransfilastap/" aria-label="github account"><GitHubLogoIcon/></Link>
          <Link href="https://x.com/franspotter/" aria-label="X account"><TwitterLogoIcon/></Link>
          <Link href="https://www.linkedin.com/in/fransfilastapratama/" aria-label="linkedin account"><LinkedInLogoIcon/></Link>
        </div>
      </div>
    </footer>
  );
}
