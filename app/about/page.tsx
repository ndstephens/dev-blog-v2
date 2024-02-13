import { type Metadata } from 'next';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';
import { components } from '@/components/mdxCustomComponents';

import { meta } from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'About',
  description: 'A bit about me.',
  openGraph: {
    ...meta.openGraph,
    title: 'About | Nate Stephens',
    description: 'A bit about me.',
    url: '/about',
  },
};

export default async function AboutPage() {
  const source = await fs.readFile('static-pages/about.mdx', 'utf-8');
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeAccessibleEmojis],
      },
    },
  });

  return (
    <div className="gradient-page-body h-full">
      <div className="page-padding mx-auto flex h-full max-w-pageWidth justify-center py-[16vh]">
        <SkipAnchor />
        <h1 className="sr-only">About Me</h1>
        <article className="my-prose">{content}</article>
      </div>
    </div>
  );
}
