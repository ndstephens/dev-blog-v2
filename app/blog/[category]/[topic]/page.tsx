import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import PageHeader from '@/components/PageHeader/PageHeader';
import PageBody from '@/components/PageBody/PageBody';
import TopicsFilter from '@/components/TopicsFilter/TopicsFilter';
import PostPreview from '@/components/PostPreview/PostPreview';

import { getAllPostTopicsInUse, getPostPreviews } from '@/lib/api/posts';
import { type BlogRoute, blogRoutes } from '@/lib/config/routes';
import { metaConfig } from '@/lib/config/metadata';
import { PostTopic, PostTopicSchema } from '@/lib/api/posts/types';

//* META DATA
export async function generateMetadata({
  params,
}: {
  params: { category: BlogRoute['category']; topic: Lowercase<PostTopic> };
}) {
  const { category, topic } = params;
  const route = blogRoutes.find((route) => route.category === category);
  if (!route) return notFound();

  const formattedTopic = PostTopicSchema.options.find(
    (postTopic) => postTopic.toLowerCase() === topic,
  );
  if (!formattedTopic) return notFound();

  const title = `${route.title} | ${formattedTopic}`;
  const description = `${route.descShort} ${formattedTopic}`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      ...metaConfig.openGraph,
      title: `${title} | Nate Stephens`,
      description,
      url: `${route.href}/${topic}`,
    },
  };
  return metadata;
}

//* PARAMS
export async function generateStaticParams() {
  const categories = blogRoutes.map((route) => route.category);

  const allCategoryTopicCombinations = await Promise.all(
    categories.flatMap(async (category) => {
      const categoryTopics = await getAllPostTopicsInUse(category);
      return categoryTopics.map((topic) => ({
        category,
        topic,
      }));
    }),
  ).then((combinations) => combinations.flat());

  return allCategoryTopicCombinations;
}

//* PAGE
export default async function BlogCategoryTopicPage({
  params,
}: {
  params: { category: BlogRoute['category']; topic: Lowercase<PostTopic> };
}) {
  const { category, topic } = params;
  const route = blogRoutes.find((route) => route.category === category);
  if (!route) return notFound();

  const formattedTopic = PostTopicSchema.options.find(
    (postTopic) => postTopic.toLowerCase() === topic,
  );
  if (!formattedTopic) return notFound();

  const postPreviews = await getPostPreviews(category, formattedTopic);
  const postTopics = await getAllPostTopicsInUse(category);

  return (
    <>
      <PageHeader>
        <h1 className="pageTitle flex flex-wrap items-center [word-spacing:0.5rem]">
          <span className="flex items-center whitespace-nowrap">
            {route.title.toLocaleUpperCase()}
            {!!topic && (
              <ChevronRightIcon className="mx-3" width={42} height={42} />
            )}
          </span>
          {!!topic && (
            <span className="font-normal text-primary-300">
              {formattedTopic}
            </span>
          )}
        </h1>
        <p className="pageSubTitle">{route.brief}</p>
      </PageHeader>

      <PageBody>
        <div className="grid max-md:gap-y-16 md:grid-cols-[2fr,1fr] md:items-start md:gap-x-24 md:[grid-template-areas:'posts_filter']">
          <TopicsFilter
            currentTopic={formattedTopic}
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
