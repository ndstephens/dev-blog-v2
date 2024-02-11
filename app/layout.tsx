import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Exo, Oswald, Red_Hat_Mono } from 'next/font/google';

import SiteHeader from '@/components/SiteHeader/SiteHeader';

import './globals.css';

const sans = Exo({ subsets: ['latin'], variable: '--font-sans' });
const display = Oswald({ subsets: ['latin'], variable: '--font-display' });
const mono = Red_Hat_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    template: '%s | Nate Stephens',
    default: 'Dev Blog',
  },
  description:
    'A technical blog about web development focusing on React, Next.js, TypeScript, CSS, and more.',
  metadataBase: new URL('https://www.natestephens.dev'),
  openGraph: {
    siteName: 'Nate Stephens',
    url: 'https://www.natestephens.dev',
    type: 'website',
    title: 'Nate Stephens',
    description:
      'A technical blog about web development focusing on React, Next.js, TypeScript, CSS, and more.',
    images: [],
  },
  twitter: {
    site: '@fivefloral',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="min-h-full">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} selection:bg-surface-300 bg-surface-900 text-textClr-200 flex h-full flex-col overscroll-y-none font-sans antialiased selection:text-gray-900`}
      >
        <SiteHeader />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
