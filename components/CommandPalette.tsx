'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CALENDLY, EMAIL, socials } from '@/lib/data/socials';
import { EASE_OUT_EXPO } from '@/lib/motion';

export type Command = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (viewId: string) => void;
  onStrum: () => void;
};

export default function CommandPalette({ open, onOpenChange, onNavigate, onStrum }: Props) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();

  const commands = useMemo<Command[]>(() => {
    const openUrl = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');

    return [
      { id: 'about', label: 'about me', hint: 'go', run: () => onNavigate('about') },
      { id: 'projects', label: 'my projects', hint: 'go', run: () => onNavigate('projects') },
      { id: 'writing', label: 'writing', hint: 'go', run: () => onNavigate('writing') },
      { id: 'music', label: 'music', hint: 'go', run: () => onNavigate('music') },
      { id: 'contact', label: 'contact', hint: 'go', run: () => onNavigate('contact') },
      { id: 'send-song', label: 'send me a song', hint: 'go', run: () => onNavigate('music') },
      {
        id: 'copy-email',
        label: 'copy email',
        hint: EMAIL,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).then(
            () => setFlash('copied!'),
            () => setFlash('could not copy, sorry')
          );
        },
      },
      { id: 'call', label: 'schedule a call', hint: 'calendly', run: openUrl(CALENDLY) },
      ...socials.map((social) => ({
        id: `social-${social.name}`,
        label: social.name,
        hint: 'open',
        run: openUrl(social.url),
      })),
      { id: 'strum', label: 'strum', hint: 'you found it', run: onStrum },
      {
        id: 'source',
        label: 'who made this?',
        hint: 'github',
        run: openUrl('https://github.com/barnamarczali/personal-website'),
      },
    ];
  }, [onNavigate, onStrum]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) => `${command.label} ${command.hint ?? ''}`.toLowerCase().includes(needle));
  }, [commands, query]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setFlash(null);
      return;
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(id);
  }, [flash]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const command = results[cursor];
      if (!command) return;
      command.run();
      // Copy stays open so the confirmation is visible.
      if (command.id !== 'copy-email') onOpenChange(false);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="close command palette"
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-brand-bg-deep/70 backdrop-blur-sm cursor-default"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="command palette"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-brand-bg/95 ring-1 ring-brand-text/15 shadow-[0_30px_80px_-24px_rgb(2_15_34/0.8)]"
            onKeyDown={handleKeyDown}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="type a command..."
              aria-label="search commands"
              className="w-full bg-transparent px-5 py-4 text-base font-light outline-none text-brand-text placeholder:text-brand-text/35 border-b border-brand-text/10"
            />

            <ul className="max-h-[45vh] overflow-y-auto scroll-area py-2">
              {results.length === 0 && (
                <li className="px-5 py-3 text-sm font-light text-brand-text/40">nothing matches that one</li>
              )}
              {results.map((command, index) => (
                <li key={command.id}>
                  <button
                    onMouseEnter={() => setCursor(index)}
                    onClick={() => {
                      command.run();
                      if (command.id !== 'copy-email') onOpenChange(false);
                    }}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-2.5 text-left text-sm font-light transition-colors duration-150 ${
                      index === cursor ? 'bg-brand-accent/15 text-brand-accent' : 'text-brand-text/75'
                    }`}
                  >
                    <span>{command.label}</span>
                    {command.hint && (
                      <span className="font-mono text-[10px] tracking-wider text-brand-text/30">{command.hint}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between px-5 py-2.5 border-t border-brand-text/10">
              <span className="font-mono text-[10px] tracking-wider text-brand-text/30">
                up and down to move, enter to pick, esc to close
              </span>
              {flash && <span className="text-xs font-light text-brand-accent animate-fade-in">{flash}</span>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
