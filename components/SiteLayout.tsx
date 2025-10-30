'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ClickSpark from '@/components/ClickSpark';

const socials = [
  { name: 'github', url: 'https://github.com/barnamarczali' },
  { name: 'linkedin', url: 'https://linkedin.com/in/barnamarczali' },
  { name: 'x', url: 'https://x.com/barnamarczali' },
  { name: 'email', url: 'mailto:marczali.barna@gmail.com' },
  { name: 'threads', url: 'https://threads.net/@barnamarczali' },
];

const menuItems = [
  { name: 'about me', path: '/about-me' },
  { name: 'my projects', path: '/projects' },
  { name: 'music', path: '/music' },
  { name: 'contact', path: '/contact' },
];

const SPARK_DURATION = 520;
const CONTENT_TRANSITION_DURATION = 520;

export default function SiteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentContent, setCurrentContent] = useState(children);
  const [currentKey, setCurrentKey] = useState(pathname);
  const [outgoingContent, setOutgoingContent] = useState<React.ReactNode | null>(null);
  const [outgoingKey, setOutgoingKey] = useState<string | null>(null);
  const [isAnimatingContent, setIsAnimatingContent] = useState(false);
  const [navPending, setNavPending] = useState(false);

  // Handle content transitions when the route changes
  useEffect(() => {
    if (pathname === currentKey) {
      setCurrentContent(children);
      return;
    }

    setOutgoingContent(currentContent);
    setOutgoingKey(currentKey);
    setCurrentContent(children);
    setCurrentKey(pathname);
    setIsAnimatingContent(true);
  }, [children, pathname, currentContent, currentKey]);

  useEffect(() => {
    if (!isAnimatingContent) return;

    const timeout = setTimeout(() => {
      setOutgoingContent(null);
      setOutgoingKey(null);
      setIsAnimatingContent(false);
    }, CONTENT_TRANSITION_DURATION);

    return () => clearTimeout(timeout);
  }, [isAnimatingContent]);

  useEffect(() => {
    // Route has updated, allow navigation again
    setNavPending(false);
  }, [pathname]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();

    if (pathname === path || navPending) return;

    setNavPending(true);

    setTimeout(() => {
      router.push(path);
    }, SPARK_DURATION);
  };

  return (
    <ClickSpark
      sparkColor="#E58F65"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
    >
      <main className="min-h-screen relative overflow-hidden">
        {/* Header with name */}
        <div className="absolute top-8 left-8 z-20">
          <h1 className="text-2xl md:text-3xl font-light text-brand-text">
            barna marczali
          </h1>
        </div>

        {/* Menu items */}
        <nav className="absolute top-24 left-8 flex flex-col gap-4 z-20">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavigation(e, item.path)}
              className={`text-left text-lg font-light transition-colors duration-300 cursor-pointer ${
                pathname === item.path
                  ? 'text-brand-accent'
                  : 'text-brand-text hover:text-brand-accent'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Main content */}
        <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-32 z-10 pointer-events-none">
          <div className="relative max-w-2xl text-brand-text pointer-events-auto page-content-wrapper">
            {outgoingContent && (
              <div
                key={outgoingKey ?? 'outgoing'}
                className="page-content-layer page-content-exit"
              >
                {outgoingContent}
              </div>
            )}
            <div
              key={currentKey}
              className={`page-content-current ${
                isAnimatingContent ? 'page-content-enter' : ''
              }`}
            >
              {currentContent}
            </div>
          </div>
        </div>

        {/* Social links at bottom */}
        <nav className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:gap-12 z-20">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-text hover:text-brand-accent transition-colors duration-300 text-sm md:text-base font-light"
            >
              {social.name}
            </a>
          ))}
        </nav>
      </main>
    </ClickSpark>
  );
}

