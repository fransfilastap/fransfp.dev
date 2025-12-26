import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] mt-20 bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold gradient-text">FFP</span>
            <p className="text-sm text-[var(--text-secondary)]">
              Building software, sharing knowledge.
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/fransfilastap/" 
              aria-label="GitHub" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--background)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all border border-[var(--border-color)]"
            >
              <GitHubLogoIcon className="w-5 h-5"/>
            </Link>
            <Link 
              href="https://x.com/franspotter/" 
              aria-label="X (Twitter)" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--background)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all border border-[var(--border-color)]"
            >
              <TwitterLogoIcon className="w-5 h-5"/>
            </Link>
            <Link 
              href="https://www.linkedin.com/in/fransfilastapratama/" 
              aria-label="LinkedIn" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--background)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all border border-[var(--border-color)]"
            >
              <LinkedInLogoIcon className="w-5 h-5"/>
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} Frans Filasta Pratama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
