import { TocHeadingType } from '@/components/PostToc/PostToc';
import { slugify } from '@/lib/utils/strings';

export const getHeadingsFromMarkdown = (content: string) => {
  const headerRegex = /(?<flag>#{2,6})\s+(?<content>.+)/g;

  const headings = Array.from(content.matchAll(headerRegex)).map(
    ({ groups }) => {
      const { flag, content } = groups as { flag: string; content: string };
      return {
        tag: `h${flag.length}`,
        content: content.replaceAll(/`|\*|_|:/gi, ''),
      } as Omit<TocHeadingType, 'slug' | 'depth'>;
    },
  );

  // Determine "highest ranking" header tag. Is it an "h1" or an "h2" or ??
  // Highest rank will have an index of "0". Next will have index of "1".
  // Index is used to evaluate padding-left in the UI.
  // ex. Highest rank has no padding-left, next rank has some, next rank has even more, etc etc.
  // In this blog the highest rank should in the post should be an "h2".
  const uniqueHeadersTags = [
    ...new Set(headings.map((heading) => heading.tag)),
  ].sort();

  // Need to differentiate heading slugs with the same name.
  // The first will just be the name (ie <h2>Summary</h2> is "summary").
  // Each additional with have an incremented number added on (ie <h3>Summary</h3> is "summary-1").
  // Notice the first usage does not have any number added on...no "-0".
  // Also notice they don't have to be of the same heading rank. It's just about tracking the number of usages of the slug name (value) itself.
  const slugCountTracker: Record<string, number> = {};
  const updateAndReturnSlugCount = (slug: string) => {
    slugCountTracker[slug] =
      slugCountTracker[slug] === undefined ? 0 : slugCountTracker[slug] + 1;
    return slugCountTracker[slug];
  };

  const headingsWithDepth: TocHeadingType[] = headings.map((heading) => {
    const slug = slugify(heading.content);
    const slugCount = updateAndReturnSlugCount(slug);
    return {
      ...heading,
      slug: `${slug}${!!slugCount ? '-' + slugCount : ''}`,
      depth: uniqueHeadersTags.findIndex(
        (tag) => tag === heading.tag,
      ) as TocHeadingType['depth'],
    };
  });

  // ex. [
  //   { tag: 'h2', content: 'Intro', slug: 'intro', depth: 0 },
  //   { tag: 'h3', content: 'Summary', slug: 'summary', depth: 1 },
  //   { tag: 'h2', content: 'Content', slug: 'content', depth: 0 },
  //   { tag: 'h3', content: 'Review', slug: 'review', depth: 1 },
  //   { tag: 'h4', content: 'Summary', slug: 'summary-1', depth: 2 }
  // ]

  return headingsWithDepth;
};
