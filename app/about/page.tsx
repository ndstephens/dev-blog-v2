import { type Metadata } from 'next';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';
import { components } from '@/components/mdxCustomComponents';
import PageWrapper from '@/components/PageWrapper/PageWrapper';

import { metaConfig } from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'About',
  description: 'A bit about me.',
  openGraph: {
    ...metaConfig.openGraph,
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
    <PageWrapper className="max-w-pageWidth">
      <SkipAnchor />
      <h1 className="sr-only">About Me</h1>
      <div className="flex justify-center">
        <article className="my-prose">{content}</article>
      </div>
    </PageWrapper>
  );
}
