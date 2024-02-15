import { Metadata } from 'next';

import PageHeader from '@/components/PageHeader/PageHeader';
import PageBody from '@/components/PageBody/PageBody';
import PostLinks from '@/components/PostLinks/PostLinks';

import { getAllSlugs, getPostFromSlug } from '@/lib/api/posts';
import { metaConfig } from '@/lib/config/metadata';
import { PostTocDesktop, PostTocMobile } from '@/components/PostToc/PostToc';
import { getHeadingsFromMarkdown } from '@/components/PostToc/utils';

//* META DATA
export async function generateMetadata({
  params,
}: {
  params: { postSlug: string };
}) {
  const { postSlug } = params;
  const { meta } = await getPostFromSlug(postSlug);
  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    openGraph: {
      ...metaConfig.openGraph,
      title: `${meta.title} | Nate Stephens`,
      description: meta.description,
      url: `/${postSlug}`,
      type: 'article',
      authors: ['Nate Stephens'],
      publishedTime: meta.created,
      modifiedTime: meta.updated,
    },
  };
  return metadata;
}

//* PARAMS
export async function generateStaticParams() {
  const allBlogPostSlugs = await getAllSlugs('blog');
  return allBlogPostSlugs.map((postSlug) => ({
    postSlug,
  }));
}

//* PAGE
export default async function BlogPostPage({
  params,
}: {
  params: { postSlug: string };
}) {
  const { postSlug } = params;
  const { contentString, content, meta } = await getPostFromSlug(postSlug);
  const { title, category, topics } = meta;

  const headings = getHeadingsFromMarkdown(contentString);

  return (
    <>
      <PageHeader>
        <h1 className="pageTitle">{title}</h1>
        <PostLinks
          category={category}
          topics={topics}
          className="pageSubTitle"
        />
      </PageHeader>

      <PageBody>
        <div className="flex flex-wrap justify-center min-[1088px]:flex-row-reverse min-[1088px]:items-start">
          <PostTocMobile
            headings={headings}
            className="basis-[720px] pb-8 min-[1088px]:hidden"
          />
          <PostTocDesktop
            headings={headings}
            className="sticky top-[calc(theme(spacing.headerHeightDesktop)+3rem)] ml-auto hidden max-h-[calc(100vh-(theme(spacing.headerHeightDesktop)+3rem)-2rem)] basis-[240px] overflow-auto pb-6 min-[1088px]:block"
          />
          {/* use for TOC highlighting */}
          <div className="post-page-blank" />
          <article className="my-prose">{content}</article>
        </div>
      </PageBody>
    </>
  );
}
