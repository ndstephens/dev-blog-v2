import { type Metadata } from 'next';

import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';
import ProjectImage from '@/components/ProjectImage/ProjectImage';
import PageWrapper from '@/components/PageWrapper/PageWrapper';

import { getAllSlugs, getProjectFromSlug } from '@/lib/api/posts';
import { metaConfig } from '@/lib/config/metadata';

//* META DATA
export async function generateMetadata({
  params,
}: {
  params: { projectSlug: string };
}) {
  const { projectSlug } = params;
  const { meta } = await getProjectFromSlug(projectSlug);
  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    openGraph: {
      ...metaConfig.openGraph,
      title: `${meta.title} | Nate Stephens`,
      description: meta.description,
      url: `/${projectSlug}`,
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
  const allProjectSlugs = await getAllSlugs('project');
  return allProjectSlugs.map((projectSlug) => ({
    projectSlug,
  }));
}

//* PAGE
export default async function ProjectPage({
  params,
}: {
  params: { projectSlug: string };
}) {
  const { projectSlug } = params;
  const { content, meta } = await getProjectFromSlug(projectSlug);
  const { title, description, gradient, imgAlt, imgUrl } = meta;

  return (
    <PageWrapper className="max-w-narrowPageWidth">
      <SkipAnchor />
      <div className="mb-10 ml-1 flex flex-col gap-y-5">
        <h1 className="text-4xl font-semibold text-textClr-50">{title}</h1>
        <p className="text-balance text-xl font-medium text-textClr-400">
          {description}
        </p>
      </div>
      <ProjectImage gradient={gradient} imgAlt={imgAlt} imgUrl={imgUrl} />
      <div className="mt-12 flex justify-center sm:mt-24">
        <article className="my-prose">{content}</article>
      </div>
    </PageWrapper>
  );
}
