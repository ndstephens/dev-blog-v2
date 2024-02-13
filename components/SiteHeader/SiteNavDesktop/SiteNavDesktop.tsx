'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import { blogRoutes } from '@/lib/config/routes';

export default function SiteNavDesktop() {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      className="relative hidden h-full md:block [&>div]:h-full"
      delayDuration={100}
    >
      <NavigationMenu.List className="flex h-full list-none items-center divide-x-2 divide-surface-800 font-semibold text-textClr-400">
        {/* BLOG */}
        <NavigationMenu.Item className="flex h-full items-center pr-4">
          <NavigationMenu.Trigger
            className={clsx(
              'group flex items-center gap-x-1 rounded px-3 py-1 uppercase tracking-wider transition-colors data-[state=open]:text-textClr-100 hocusv:text-textClr-100',
              pathname.startsWith('/blog') && 'text-textClr-100',
            )}
          >
            Blog
            <CaretDownIcon
              width={20}
              height={20}
              className="text-current transition-transform ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute -left-3 top-full  rounded-b-md bg-transparent backdrop-blur-md">
            <ul className="space-y-2 px-3 py-2">
              {blogRoutes.map(({ title, href }) => (
                <li key={href}>
                  <LinkItem href={href} title={title} />
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* PROJECTS */}
        <NavigationMenu.Item className="flex h-full items-center px-4">
          <LinkItem href="/projects" title="Projects" />
        </NavigationMenu.Item>

        {/* ABOUT */}
        <NavigationMenu.Item className="flex h-full items-center pl-4">
          <LinkItem href="/about" title="About" />
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

//* =============================================
//*                 LINK ITEM                   =
//*==============================================
type LinkItemProps = {
  href: string;
  title: string;
  className?: string;
};

function LinkItem({ href, title, className }: LinkItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        active={isActive}
        className={clsx(
          'block rounded px-3 py-1 uppercase tracking-wider transition-colors hocusv:text-textClr-100',
          className,
          isActive && 'text-textClr-100',
        )}
      >
        {title}
      </NavigationMenu.Link>
    </Link>
  );
}
