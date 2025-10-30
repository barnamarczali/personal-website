import ClickSpark from '@/components/ClickSpark';

export default function Page() {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/barnamarczali' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/barnamarczali' },
    { name: 'X', url: 'https://x.com/barnamarczali' },
    { name: 'Email', url: 'mailto:barna@marczali.com' },
    { name: 'Threads', url: 'https://threads.net/@barnamarczali' },
  ];

  return (
    <ClickSpark
      sparkColor="#E58F65"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
    >
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-start -translate-x-8 -translate-y-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-brand-text">
            Barna Marczali
          </h1>
          
          <nav className="flex flex-wrap gap-4 md:gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-accent transition-colors duration-300 text-lg md:text-xl font-light"
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

