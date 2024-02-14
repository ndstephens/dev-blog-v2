import Link from 'next/link';

import PostLinks from '@/components/PostLinks/PostLinks';

import type { PostMeta } from '@/lib/api/posts/types';

type PostPreviewProps = {
  post: PostMeta;
};

export default function PostPreview({ post }: PostPreviewProps) {
  const { category, description, slug, title, topics } = post;

  return (
    <article className="flex flex-col gap-y-4 text-textClr-50">
      <h2 className="text-balance text-xl font-semibold tracking-wide xs:text-2xl">
        <Link href={`/${slug}`} className="hocusv:linkHoverStyles">
          {title}
        </Link>
      </h2>
      {category !== 'snippets' && (
        <p className="line-clamp-4 text-base font-normal leading-relaxed">
          {description}
        </p>
      )}
      <PostLinks category={category} topics={topics} />
    </article>
  );
}
