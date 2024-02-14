import { type Metadata } from 'next';

import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';
import ProjectPreview from '@/components/ProjectPreview/ProjectPreview';

import { metaConfig } from '@/lib/config/metadata';
import { getAllProjectPreviews } from '@/lib/api/posts';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Some personal and professional projects I've worked on",
  openGraph: {
    ...metaConfig.openGraph,
    title: 'Projects | Nate Stephens',
    description: "Some personal and professional projects I've worked on",
    url: '/projects',
  },
};

export default async function ProjectsPage() {
  const projectPreviews = await getAllProjectPreviews();

  return (
    <div className="gradient-page-body flex-grow">
      <div className="page-padding mx-auto flex h-full max-w-[58rem] flex-col justify-center py-[10vh] sm:py-[16vh]">
        <SkipAnchor />
        <h1 className="sr-only">Projects</h1>
        <h2 className="mb-12 text-3xl font-semibold text-textClr-50">
          Work Projects
        </h2>
        <ul className="flex flex-col gap-y-20 sm:gap-y-24">
          {projectPreviews.map((project) => (
            <ProjectPreview key={project.slug} project={project} />
          ))}
        </ul>
      </div>
    </div>
  );
}
