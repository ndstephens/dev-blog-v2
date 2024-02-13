// import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Exo, Oswald, Red_Hat_Mono } from 'next/font/google';

import { SkipLink } from '@/components/SkipToContent/SkipToContent';
import SiteHeader from '@/components/SiteHeader/SiteHeader';
import SiteFooter from '@/components/SiteFooter/SiteFooter';

import { meta } from '@/lib/config/metadata';

import './globals.css';

const sans = Exo({ subsets: ['latin'], variable: '--font-sans' });
const display = Oswald({ subsets: ['latin'], variable: '--font-display' });
const mono = Red_Hat_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = meta;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} flex min-h-full flex-col overscroll-y-none bg-surface-900 font-sans text-textClr-200 antialiased selection:bg-primary-300 selection:text-gray-900`}
      >
        <SkipLink />
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
