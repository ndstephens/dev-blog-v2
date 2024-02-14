import { getAllProjectPreviews } from '@/lib/api/posts';

export default async function ProjectsPage() {
  const projectPreviews = await getAllProjectPreviews();

  return (
    <div>
      <h2 className="py-[800px]">Projects</h2>
    </div>
  );
}
