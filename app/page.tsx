'use client';

import { useState } from 'react';
import ClickSpark from '@/components/ClickSpark';

const socials = [
  { name: 'github', url: 'https://github.com/barnamarczali' },
  { name: 'linkedin', url: 'https://linkedin.com/in/barnamarczali' },
  { name: 'x', url: 'https://x.com/barnamarczali' },
  { name: 'email', url: 'mailto:marczali.barna@gmail.com' },
  { name: 'threads', url: 'https://threads.net/@barnamarczali' },
];

const menuItems = [
  { name: 'about me', id: 'about' },
  { name: 'my projects', id: 'projects' },
  { name: 'music', id: 'music' },
  { name: 'contact', id: 'contact' },
];

const CONTENT_VIEWS = {
  about: () => (
    <div>
      <h2 className="text-2xl font-light mb-4">About Me</h2>
      <p className="text-lg font-light leading-relaxed mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-lg font-light leading-relaxed mb-4">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="text-lg font-light leading-relaxed">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div>
  ),
  projects: () => (
    <div>
      <h2 className="text-2xl font-light mb-4">My Projects</h2>
      <p className="text-lg font-light leading-relaxed mb-4">
        Here are some of the projects I've been working on. Each project represents a unique challenge and learning opportunity.
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Project One</h3>
          <p className="text-base font-light leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Project Two</h3>
          <p className="text-base font-light leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Project Three</h3>
          <p className="text-base font-light leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </div>
  ),
  music: () => (
    <div>
      <h2 className="text-2xl font-light mb-4">Music</h2>
      <p className="text-lg font-light leading-relaxed mb-4">
        Music has always been an integral part of my life. Here's a glimpse into my musical journey and the genres that inspire me.
      </p>
      <p className="text-lg font-light leading-relaxed mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="text-lg font-light leading-relaxed">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
      </p>
    </div>
  ),
  contact: () => (
    <div>
      <h2 className="text-2xl font-light mb-4">Contact</h2>
      <p className="text-lg font-light leading-relaxed mb-6">
        I'd love to hear from you! Feel free to reach out through any of the social links below, or send me an email directly.
      </p>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Email</h3>
          <a 
            href="mailto:marczali.barna@gmail.com"
            className="text-base font-light leading-relaxed hover:text-brand-accent transition-colors duration-300"
          >
            marczali.barna@gmail.com
          </a>
        </div>
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Social Media</h3>
          <p className="text-base font-light leading-relaxed">
            Connect with me on GitHub, LinkedIn, X, or Threads. You'll find all the links at the bottom of the page.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-light mb-2 text-brand-accent">Availability</h3>
          <p className="text-base font-light leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>
      </div>
    </div>
  ),
};

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const handleExpand = () => {
    setIsExpanded(true);
    // Set initial view to "about me" after animation starts
    setTimeout(() => {
      setCurrentView('about');
    }, 400);
  };

  const handleMenuClick = (itemId: string) => {
    if (currentView === itemId || isTransitioning) return;

    // Determine scroll direction based on menu item order
    const currentIndex = currentView ? menuItems.findIndex(item => item.id === currentView) : -1;
    const newIndex = menuItems.findIndex(item => item.id === itemId);
    
    // If going forward in menu (0->1, 1->2, etc.), scroll down
    // If going backward (1->0, 2->1, etc.), scroll up
    const direction = newIndex > currentIndex ? 'down' : 'up';
    setScrollDirection(direction);

    // Start transition immediately - both animations happen simultaneously
    setPreviousView(currentView);
    setIsTransitioning(true);
    setCurrentView(itemId);
    
    // Clear transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousView(null);
    }, 598);
  };

  const CurrentContent = currentView ? CONTENT_VIEWS[currentView as keyof typeof CONTENT_VIEWS] : null;
  const PreviousContent = previousView ? CONTENT_VIEWS[previousView as keyof typeof CONTENT_VIEWS] : null;

  return (
    <ClickSpark
      sparkColor="#E58F65"
      sparkSize={9}
      sparkRadius={18}
      sparkCount={7}
      duration={500}
    >
      <main className="min-h-screen relative overflow-hidden">
        {/* Initial centered view */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-[330ms] ${
            isExpanded
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-start -translate-x-8 -translate-y-12">
            <button
              onClick={handleExpand}
              className="flex items-center gap-3 group mb-6 cursor-pointer bg-transparent border-none p-0"
            >
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-light text-brand-text group-hover:text-brand-accent transition-colors duration-300">
                barna marczali
              </h1>
              <svg
                className="w-8 h-8 text-brand-text group-hover:text-brand-accent transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <nav className="flex flex-wrap gap-12 md:gap-18">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text hover:text-brand-accent transition-colors duration-300 text-sm md:text-lg font-light"
                >
                  {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Expanded layout */}
        <div
          className={`absolute inset-0 transition-opacity duration-[390ms] ${
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Header with name */}
          <div
            className={`absolute top-8 left-8 transition-all duration-[520ms] delay-[130ms] z-20 ${
              isExpanded ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : 'translate-x-[calc(50vw-2rem)] translate-y-[calc(50vh-2rem)] scale-[0.3] opacity-0'
            }`}
            style={{
              transformOrigin: 'top left',
            }}
          >
            <h1 className="text-2xl md:text-3xl font-light text-brand-text">
              barna marczali
            </h1>
          </div>

          {/* Menu items */}
          <nav
            className={`absolute top-24 left-8 flex flex-col gap-4 transition-all duration-[520ms] delay-[195ms] z-20 ${
              isExpanded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`text-left text-lg font-light transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 ${
                  currentView === item.id
                    ? 'text-brand-accent'
                    : 'text-brand-text hover:text-brand-accent'
                }`}
                style={{
                  transitionDelay: `${195 + index * 39}ms`,
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <div
            className={`absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-32 transition-all duration-[520ms] delay-[325ms] z-10 pointer-events-none ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative max-w-2xl text-brand-text pointer-events-auto page-content-wrapper">
              {/* Previous content (exiting) */}
              {PreviousContent && (
                <div
                  className={`page-content-layer page-content-exit-${scrollDirection}`}
                >
                  <PreviousContent />
                </div>
              )}
              
              {/* Current content (entering) */}
              {CurrentContent && (
                <div
                  className={`page-content-current ${
                    isTransitioning || previousView
                      ? `page-content-enter-${scrollDirection}`
                      : ''
                  }`}
                >
                  <CurrentContent />
                </div>
              )}
            </div>
          </div>

          {/* Social links at bottom */}
          <nav
            className={`absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:gap-12 transition-all duration-[520ms] delay-[260ms] z-20 ${
              isExpanded ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[calc(-50vh+2rem)] scale-[0.3] opacity-0'
            }`}
            style={{
              transformOrigin: 'bottom center',
            }}
          >
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
        </div>
      </main>
    </ClickSpark>
  );
}
