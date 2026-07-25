import Link from 'next/link';

const links = [
  { name: 'about me', href: '/?v=about' },
  { name: 'my projects', href: '/?v=projects' },
  { name: 'writing', href: '/?v=writing' },
  { name: 'music', href: '/?v=music' },
  { name: 'contact', href: '/?v=contact' },
];

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight">you seem lost</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/beachball.svg"
            alt=""
            aria-hidden="true"
            className="w-6 h-6 animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>

        <p className="text-base font-light leading-relaxed text-brand-text/70 mb-10">
          this page is still typing, or it never existed in the first place. either way, here is the way back.
        </p>

        <nav aria-label="sections" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-light text-brand-text/80 hover:text-brand-accent transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
