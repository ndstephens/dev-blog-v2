import { PostCategory } from '@/lib/api/posts/types';

export type BlogRoute = {
  title: string;
  category: PostCategory | 'all';
  href: string;
  brief: string;
  descLong: string;
  descShort: string;
};

export const blogRoutes: BlogRoute[] = [
  {
    title: 'All Posts',
    category: 'all',
    href: '/blog/all',
    brief: 'All of my published content',
    descLong:
      'All of my published content. This includes articles, notes, and code snippets pertaining to React, Next.js, TypeScript, CSS and more.',
    descShort: 'All of my published content pertaining to',
  },
  {
    title: 'Articles',
    category: 'articles',
    href: '/blog/articles',
    brief: 'Thoughts and info worth sharing',
    descLong:
      "Articles I've written pertaining to subjects such as React, Next.js, TypeScript, CSS and more.",
    descShort: "Articles I've written pertaining to",
  },
  {
    title: 'Notes',
    category: 'notes',
    href: '/blog/notes',
    brief: 'Reductions of broader subjects',
    descLong:
      "Notes I've taken while learning subjects such as React, Next.js, TypeScript, CSS and more.",
    descShort: "Notes I've taken while learning",
  },
  {
    title: 'Snippets',
    category: 'snippets',
    href: '/blog/snippets',
    brief: 'Code bits worth remembering',
    descLong:
      'Code snippets pertaining to React, Next.js, TypeScript, CSS and more.',
    descShort: 'Code snippets pertaining to',
  },
];
