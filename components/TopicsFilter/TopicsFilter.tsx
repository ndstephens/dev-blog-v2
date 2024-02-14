import Link from 'next/link';
import clsx from 'clsx';

import type { PostCategory, PostTopic } from '@/lib/api/posts/types';
import { slugify } from '@/lib/utils/strings';

type TopicsFilterProps = {
  currentTopic: PostTopic | undefined;
  topics: PostTopic[];
  category: PostCategory | 'all';
  className?: string;
};

export default function TopicsFilter({
  currentTopic,
  topics,
  category,
  className,
}: TopicsFilterProps) {
  return (
    <div className={className}>
      <h2 className="sectionHeader">Filter by Topic</h2>
      <ul className="flex flex-wrap gap-3">
        {topics.map((topic) => {
          const isActiveTopic = topic === currentTopic;
          return (
            <li key={topic}>
              <Link
                href={
                  topic === currentTopic
                    ? `/blog/${category}`
                    : `/blog/${category}/${slugify(topic)}`
                }
                className={clsx(
                  'inline-block rounded border-2 border-current px-4 py-2 font-semibold transition-all hocusv:rounded-xl hocusv:text-textClr-50',
                  !currentTopic && 'text-textClr-400',
                  isActiveTopic &&
                    'rounded-xl text-primary-300 hocusv:text-primary-300',
                  !!currentTopic &&
                    !isActiveTopic &&
                    'border-current text-textClr-400',
                )}
              >
                {topic}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
