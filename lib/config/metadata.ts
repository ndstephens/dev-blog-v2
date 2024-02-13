import { type Metadata } from 'next';

export const meta: Metadata = {
  title: {
    template: '%s | Nate Stephens',
    default: 'Nate Stephens',
  },
  description:
    'A technical blog about web development focusing on React, Next.js, TypeScript, CSS, and more.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'CSS',
    'TailwindCSS',
    'accessibility',
    'front end web development',
  ],
  metadataBase: new URL('https://www.natestephens.dev'),
  // Open Graph
  openGraph: {
    title: 'Nate Stephens - Web Development Blog',
    description:
      'A technical blog about web development focusing on React, Next.js, TypeScript, CSS, and more.',
    type: 'website',
    siteName: 'Nate Stephens - Web Development Blog',
    locale: 'en_US',
    url: 'https://www.natestephens.dev',
  },
  // Twitter
  twitter: {
    site: '@fivefloral',
  },
};
