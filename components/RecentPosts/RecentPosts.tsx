import Link from 'next/link';

import { PostMeta } from '@/lib/api/posts/types';

interface RecentPostsProps {
  posts: PostMeta[];
  className?: string;
}

export default function RecentPosts({ posts, className }: RecentPostsProps) {
  return (
    <section className={className}>
      <h2 className="sectionHeader mb-4">Recently Published</h2>
      <ul role="list" className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.slug}
              className="group -mx-2 flex items-center justify-between rounded-2xl px-2 py-4 tracking-wider transition-colors hocusv:bg-surface-800 xs:-mx-4 xs:p-4"
            >
              <h3 className="mr-8 truncate text-sm font-medium transition-colors group-hocusv:text-primary-300 xs:text-base sm:text-lg">
                {post.title}
              </h3>
              <p className="whitespace-nowrap text-sm">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: 'UTC',
                }).format(new Date(post.created))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
