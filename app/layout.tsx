import './globals.css';
import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

// Years, dates and the now-playing title are set in mono with tabular figures.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'barna marczali. building scouty, studying cs + econ at johns hopkins, playing guitar and football (the real one).';

export const metadata: Metadata = {
  metadataBase: new URL('https://barnamarczali.com'),
  title: 'barna marczali',
  description,
  openGraph: {
    title: 'barna marczali',
    description,
    type: 'website',
    siteName: 'barna marczali',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'barna marczali',
    description,
  },
  icons: {
    icon: '/personal_favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-brand-bg text-brand-text`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
