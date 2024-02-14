import { type Metadata } from 'next';

import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';
import RouteCard from '@/components/RouteCard/RouteCard';
import RecentPosts from '@/components/RecentPosts/RecentPosts';

import { blogRoutes } from '@/lib/config/routes';
import { getPostPreviews } from '@/lib/api/posts';

const routes = blogRoutes.filter((route) => route.category !== 'all');

export const metadata: Metadata = {
  title: 'Nate Stephens - Web Development Blog',
};

export default async function HomePage() {
  const posts = (await getPostPreviews('all')).slice(0, 7);

  return (
    <PageWrapper className="max-w-narrowPageWidth">
      <SkipAnchor />
      <h1 className="sr-only">Home Page</h1>
      <div className="flex flex-col gap-y-32">
        <p className="text-balance text-[32px] font-semibold !leading-relaxed tracking-wide text-textClr-400 sm:text-4xl">
          <span className="text-textClr-50">
            Hey, I&apos;m Nate. Welcome to my dev blog.
          </span>{' '}
          Here I share what I&apos;m learning and experimenting with as a
          frontend engineer. Topics include React, TypeScript, animation,
          accessibility, and a little on full-stack development.
        </p>

        {/* ROUTE CARDS */}
        <nav
          className="hidden md:block lg:-mx-8"
          aria-labelledby="content-categories"
        >
          <h2 id="content-categories" className="sectionHeader mb-8 lg:mx-8">
            Content Categories
          </h2>
          <ul className="grid grid-cols-3 gap-8">
            {routes.map((route, i) => {
              const gradients = [
                'gradient-candy',
                'gradient-twilight',
                'gradient-sunset',
              ];
              return (
                <RouteCard
                  key={route.category}
                  href={route.href}
                  title={route.title}
                  gradient={gradients[i]}
                  body={route.brief}
                />
              );
            })}
          </ul>
        </nav>

        {/* RECENTLY PUBLISHED */}
        <RecentPosts posts={posts} />
      </div>
    </PageWrapper>
  );
}
