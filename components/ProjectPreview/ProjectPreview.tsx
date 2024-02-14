import Link from 'next/link';

import { ProjectMeta } from '@/lib/api/posts/types';

import ProjectImage from '@/components/ProjectImage/ProjectImage';

interface ProjectPreviewProps {
  project: ProjectMeta;
}

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <li>
      <Link href={`/projects/${project.slug}`} className="group">
        <div className="relative">
          <div
            className={`${project.gradient} absolute inset-0 scale-[1.03] rounded-2xl opacity-0 blur-md transition-opacity duration-500 group-hocusv:opacity-70`}
          />
          <ProjectImage
            gradient={project.gradient}
            imgUrl={project.imgUrl}
            imgAlt={project.imgAlt}
          />
        </div>
        <div className="ml-1 mt-6 flex flex-col gap-y-2 sm:mt-8">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-pretty text-base font-medium text-textClr-400">
            {project.description}
          </p>
        </div>
      </Link>
    </li>
  );
}
