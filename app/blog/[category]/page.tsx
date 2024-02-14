import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader/PageHeader';
import PageBody from '@/components/PageBody/PageBody';
import PostPreview from '@/components/PostPreview/PostPreview';
import TopicsFilter from '@/components/TopicsFilter/TopicsFilter';

import { type BlogRoute, blogRoutes } from '@/lib/config/routes';
import { metaConfig } from '@/lib/config/metadata';
import { getAllPostTopicsInUse, getPostPreviews } from '@/lib/api/posts';

//* Get all category slugs
export async function generateStaticParams() {
  return blogRoutes.map((route) => ({
    category: route.category,
  }));
}

//* Generate metadata for each category
export async function generateMetadata({
  params,
}: {
  params: { category: BlogRoute['category'] };
}) {
  const route = blogRoutes.find((route) => route.category === params.category);
  if (!route) return notFound();

  const metadata: Metadata = {
    title: route.title,
    description: route.descLong,
    openGraph: {
      ...metaConfig.openGraph,
      title: `${route.title} | Nate Stephens`,
      description: route.descLong,
      url: `/${route.href}`,
    },
  };
  return metadata;
}

//* Generate static pages for each category
export default async function BlogCategoryPage({
  params,
}: {
  params: { category: BlogRoute['category'] };
}) {
  const { category } = params;
  const route = blogRoutes.find((route) => route.category === category);
  if (!route) return notFound();

  const postPreviews = await getPostPreviews(category);
  const postTopics = await getAllPostTopicsInUse(category);

  return (
    <>
      <PageHeader>
        <h1 className="pageTitle [word-spacing:0.5rem]">
          {route.title.toLocaleUpperCase()}
        </h1>
        <p className="pageSubTitle">{route.brief}</p>
      </PageHeader>

      <PageBody>
        <div className="grid max-md:gap-y-16 md:grid-cols-[2fr,1fr] md:items-start md:gap-x-24 md:[grid-template-areas:'posts_filter']">
          <TopicsFilter
            currentTopic={undefined}
            topics={postTopics}
            category={category}
            className="select-none md:sticky md:top-[calc(theme(spacing.headerHeightDesktop)+3rem)] md:[grid-area:filter]"
          />
          <section className="grid gap-y-12 md:[grid-area:posts]">
            {postPreviews.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </section>
        </div>
      </PageBody>
    </>
  );
}
