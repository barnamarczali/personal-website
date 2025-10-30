import ClickSpark from '@/components/ClickSpark';

export default function Page() {
  const socials = [
    { name: 'github', url: 'https://github.com/barnamarczali' },
    { name: 'linkedin', url: 'https://linkedin.com/in/barnamarczali' },
    { name: 'x', url: 'https://x.com/barnamarczali' },
    { name: 'email', url: 'mailto:barna@marczali.com' },
    { name: 'threads', url: 'https://threads.net/@barnamarczali' },
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
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-light mb-6 text-brand-text">
            barna marczali
          </h1>
          
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
      </main>
    </ClickSpark>
  );
}

