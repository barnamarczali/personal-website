'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import ClickSpark from '@/components/ClickSpark';
import CommandPalette from '@/components/CommandPalette';
import GuitarStrings from '@/components/GuitarStrings';
import Landing from '@/components/Landing';
import About from '@/components/views/About';
import Projects from '@/components/views/Projects';
import Writing from '@/components/views/Writing';
import Music from '@/components/views/Music';
import Contact from '@/components/views/Contact';
import { NowPlaying, type Song } from '@/components/ui';
import { socials } from '@/lib/data/socials';
import { ScrollContainerContext, useKeySequence, useTimeOfDay } from '@/lib/hooks';
import { SPRING_SNAPPY } from '@/lib/motion';

const menuItems = [
  { name: 'about me', id: 'about' },
  { name: 'my projects', id: 'projects' },
  { name: 'writing', id: 'writing' },
  { name: 'music', id: 'music' },
  { name: 'contact', id: 'contact' },
];

const VIEW_IDS = menuItems.map((item) => item.id);
const FALLBACK_SONG: Song = { title: 'humans', url: 'https://en.wikipedia.org/wiki/Human' };
const VIEW_TRANSITION_MS = 450;

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [currentSong, setCurrentSong] = useState<Song>(FALLBACK_SONG);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [strumOpen, setStrumOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useTimeOfDay();

  /* ---------------------------------------------------------------------- */
  /*  Now playing                                                           */
  /* ---------------------------------------------------------------------- */

  const fetchCurrentSong = useCallback(async () => {
    try {
      const response = await fetch('/api/current-song');
      const data = await response.json();
      if (data.currentSong) setCurrentSong(data.currentSong);
    } catch {
      // Keep whatever is on screen; the landing falls back to the default.
    }
  }, []);

  useEffect(() => {
    void fetchCurrentSong();
  }, [fetchCurrentSong]);

  useEffect(() => {
    if (currentView === 'music') void fetchCurrentSong();
  }, [currentView, fetchCurrentSong]);

  /* ---------------------------------------------------------------------- */
  /*  Navigation                                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!isTransitioning) return;
    const id = window.setTimeout(() => {
      setIsTransitioning(false);
      setPreviousView(null);
    }, VIEW_TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [isTransitioning, currentView]);

  // Mirrors currentView so goToView can read it without becoming a new callback
  // on every navigation, and without setting state from inside an updater.
  const currentViewRef = useRef<string | null>(null);

  const goToView = useCallback((viewId: string, options: { pushUrl?: boolean } = {}) => {
    const { pushUrl = true } = options;
    if (!VIEW_IDS.includes(viewId)) return;

    setIsExpanded(true);
    if (pushUrl) window.history.replaceState(null, '', `?v=${viewId}`);

    const current = currentViewRef.current;
    if (current === viewId) return;

    const currentIndex = current ? VIEW_IDS.indexOf(current) : -1;
    const nextIndex = VIEW_IDS.indexOf(viewId);

    currentViewRef.current = viewId;
    setScrollDirection(nextIndex > currentIndex ? 'down' : 'up');
    setPreviousView(current);
    setCurrentView(viewId);
    setIsTransitioning(true);
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  const handleMenuClick = (viewId: string) => {
    if (currentView === viewId || isTransitioning) return;
    goToView(viewId);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    window.setTimeout(() => goToView('about'), 380);
  };

  const collapse = () => {
    currentViewRef.current = null;
    setIsExpanded(false);
    setCurrentView(null);
    setPreviousView(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  // Deep links: ?v=music lands straight there, back and forward walk the menu.
  useEffect(() => {
    const applyFromUrl = (allowCollapse: boolean) => {
      const view = new URLSearchParams(window.location.search).get('v');
      if (view && VIEW_IDS.includes(view)) {
        goToView(view, { pushUrl: false });
      } else if (allowCollapse) {
        currentViewRef.current = null;
        setIsExpanded(false);
        setCurrentView(null);
        setPreviousView(null);
      }
    };

    applyFromUrl(false);
    const onPopState = () => applyFromUrl(true);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [goToView]);

  /* ---------------------------------------------------------------------- */
  /*  Command palette and easter egg                                        */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openStrum = useCallback(() => setStrumOpen(true), []);
  useKeySequence('strum', openStrum);

  const paletteNavigate = useCallback((viewId: string) => goToView(viewId), [goToView]);

  /* ---------------------------------------------------------------------- */
  /*  Rendering                                                             */
  /* ---------------------------------------------------------------------- */

  const renderContent = (view: string | null) => {
    switch (view) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'writing':
        return <Writing />;
      case 'music':
        return <Music song={currentSong} />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <ClickSpark sparkColor="#E58F65" sparkSize={9} sparkRadius={18} sparkCount={7} duration={500}>
      <main className="relative min-h-[100dvh] overflow-hidden">
        {/* Collapsed landing */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-6 md:p-12 transition-opacity duration-[330ms] z-30 ${
            isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Landing onExpand={handleExpand} song={currentSong} />
        </div>

        {/* Expanded layout */}
        <div
          className={`absolute inset-0 transition-opacity duration-[390ms] ${
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={collapse}
            aria-label="back to the start"
            className={`fixed top-4 left-4 md:top-8 md:left-8 z-30 transition-all duration-[520ms] delay-[130ms] ${
              isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="text-xl md:text-2xl font-light tracking-tight text-brand-text hover:text-brand-accent transition-colors duration-300">
              barna marczali
            </span>
          </button>

          {/* Menu: left rail on desktop, bottom row on mobile */}
          <nav
            aria-label="sections"
            className={`fixed md:top-24 md:left-8 bottom-16 left-0 right-0 md:bottom-auto md:right-auto flex md:flex-col flex-row md:gap-4 gap-2 justify-around md:justify-start px-4 md:px-0 transition-all duration-[520ms] delay-[195ms] z-20 ${
              isExpanded
                ? 'md:translate-x-0 translate-y-0 opacity-100'
                : 'md:-translate-x-full translate-y-full opacity-0'
            }`}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                aria-current={currentView === item.id ? 'page' : undefined}
                className={`relative md:text-left text-center text-sm md:text-lg transition-colors duration-150 cursor-pointer bg-transparent border-none p-0 ${
                  currentView === item.id
                    ? 'text-brand-accent font-medium'
                    : 'text-brand-text/85 hover:text-brand-accent font-light'
                }`}
              >
                {currentView === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    transition={SPRING_SNAPPY}
                    className="absolute w-1.5 h-1.5 rounded-full bg-brand-accent inset-x-0 mx-auto bottom-[-0.5rem] md:inset-x-auto md:mx-0 md:bottom-auto md:inset-y-0 md:my-auto md:left-[-0.95rem]"
                  />
                )}
                {item.name}
              </button>
            ))}
          </nav>

          {/* One scroll container for every view, so switching never moves the origin. */}
          <ScrollContainerContext.Provider value={scrollRef}>
            <div
              ref={scrollRef}
              className={`scroll-area absolute inset-0 overflow-y-auto overflow-x-hidden z-0 pt-20 md:pt-24 pb-36 md:pb-28 px-5 md:px-10 lg:px-[8.5rem] xl:px-[10rem] transition-opacity duration-[520ms] delay-[325ms] ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="page-content-wrapper w-full">
                {previousView && (
                  <div className={`page-content-layer page-content-exit-${scrollDirection}`} aria-hidden="true">
                    {renderContent(previousView)}
                  </div>
                )}

                {currentView && (
                  <div
                    key={currentView}
                    className={`page-content-current ${
                      isTransitioning || previousView ? `page-content-enter-${scrollDirection}` : ''
                    }`}
                  >
                    {renderContent(currentView)}
                  </div>
                )}
              </div>
            </div>
          </ScrollContainerContext.Provider>

          {/* Ambient status rail. Wide screens only; it sits inside the bottom
              scrim's fade zone so scrolling content melts out beneath it
              instead of colliding with the text. */}
          <aside
            className={`hidden xl:flex fixed right-8 bottom-[3.75rem] z-20 flex-col items-end gap-1.5 transition-opacity duration-500 delay-[420ms] ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <NowPlaying song={currentSong} />
            <a
              href="https://tryscouty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wide text-brand-accent/80 hover:text-brand-accent transition-colors duration-300"
            >
              building scouty
            </a>
          </aside>
        </div>

        {/* Progressive scrim: content melts out beneath the fixed chrome. */}
        <div
          aria-hidden="true"
          className="fixed inset-x-0 bottom-0 h-32 md:h-28 z-10 pointer-events-none backdrop-blur-[5px] bg-gradient-to-t from-brand-bg via-brand-bg/70 to-transparent"
          style={{
            maskImage: 'linear-gradient(to top, black 58%, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black 58%, transparent)',
          }}
        />

        {/* Footer socials */}
        <nav
          aria-label="social links"
          className={`fixed bottom-3 md:bottom-8 left-0 right-0 flex justify-center gap-4 md:gap-8 lg:gap-12 z-20 transition-all duration-[520ms] delay-[260ms] ${
            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
          }`}
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              {...(social.url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="text-brand-text/85 hover:text-brand-accent transition-colors duration-300 text-xs md:text-sm lg:text-base font-light"
            >
              {social.name}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setPaletteOpen(true)}
          aria-label="open command palette"
          className="hidden lg:block fixed bottom-8 right-8 z-20 font-mono text-sm tracking-[0.2em] text-brand-text/40 hover:text-brand-accent transition-colors duration-300"
        >
          ⌘K
        </button>

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          onNavigate={paletteNavigate}
          onStrum={openStrum}
        />

        <GuitarStrings open={strumOpen} onClose={() => setStrumOpen(false)} />
      </main>
    </ClickSpark>
  );
}
