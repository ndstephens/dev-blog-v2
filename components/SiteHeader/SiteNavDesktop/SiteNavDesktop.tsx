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
    <NavigationMenu.Root className="relative h-full [&>div]:h-full">
      <NavigationMenu.List className="divide-surface-800 text-textClr-400 flex h-full list-none items-center divide-x-2 font-semibold">
        {/* BLOG */}
        <NavigationMenu.Item className="flex h-full items-center pr-4">
          <NavigationMenu.Trigger
            className={clsx(
              'hocusv:text-textClr-50 group flex items-center gap-x-1 rounded px-3 py-1 uppercase tracking-wider transition-colors',
              pathname.startsWith('/blog') && 'text-textClr-50',
            )}
          >
            Blog
            <CaretDownIcon
              width={20}
              height={20}
              className="text-current transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
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

  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        active={pathname === href}
        className={clsx(
          'hocusv:text-textClr-50 block rounded px-3 py-1 uppercase tracking-wider transition-colors',
          className,
          pathname === href && 'text-textClr-50',
        )}
      >
        {title}
      </NavigationMenu.Link>
    </Link>
  );
}
