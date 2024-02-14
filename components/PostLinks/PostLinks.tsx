import Link from 'next/link';

import type { PostCategory, PostTopic } from '@/lib/api/posts/types';
import { slugify } from '@/lib/utils/strings';

type PostLinksProps = {
  category: PostCategory;
  topics: PostTopic[];
  className?: string;
};

export default function PostLinks({
  category,
  topics,
  className,
}: PostLinksProps) {
  return (
    <div
      className={`flex items-baseline gap-x-3 font-sans tracking-wide ${className}`}
    >
      <Link
        href={`/blog/${category}`}
        className="hocusv:linkHoverStyles font-semibold text-textClr-50"
      >
        {category.toLocaleUpperCase()}
      </Link>
      <div className="relative bottom-[3px] aspect-square w-1.5 rounded-full bg-textClr-50" />
      <span className="flex flex-wrap gap-x-3 gap-y-0">
        {topics.map((topic) => {
          return (
            <Link
              href={`/blog/all/${slugify(topic)}`}
              key={topic}
              className="hocusv:linkHoverStyles font-medium text-primary-300"
            >
              {topic}
            </Link>
          );
        })}
      </span>
    </div>
  );
}
