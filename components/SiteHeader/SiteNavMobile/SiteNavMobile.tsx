'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import { blogRoutes } from '@/lib/config/routes';

export default function SiteNavMobile() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <nav aria-label="Main" className="text-textClr-400 md:hidden">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          className="block rounded-md p-2 transition-colors  hocusv:bg-surface-800 hocusv:text-textClr-100"
          aria-label="Navigation modal"
        >
          <HamburgerMenuIcon
            width={24}
            height={24}
            className="text-current"
            aria-hidden
          />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed right-5 top-5 max-h-[85vh] w-[calc(100vw-40px)] max-w-[280px] rounded-2xl bg-surface-800 p-5 text-lg font-semibold text-textClr-400">
            <ul className="flex flex-col space-y-2 py-2">
              <li
                className={clsx(
                  'pl-3 uppercase tracking-wider transition-colors has-[:hover]:text-textClr-100 has-[a:focus]:text-textClr-100',
                  pathname.startsWith('/blog') && 'text-textClr-100',
                )}
              >
                Blog
                <ul className="mt-2 space-y-2 pl-2">
                  {blogRoutes.map(({ title, href }) => (
                    <li key={href}>
                      <LinkItem
                        href={href}
                        title={title}
                        onClick={() => setOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </li>
              <LinkItem
                href="/projects"
                title="Projects"
                onClick={() => setOpen(false)}
              />
              <LinkItem
                href="/about"
                title="About"
                onClick={() => setOpen(false)}
              />
            </ul>
            <Dialog.Close className="absolute right-2 top-2 rounded-full p-2 transition-colors hocusv:bg-surface-900/40 hocusv:text-textClr-100">
              <Cross2Icon
                width={20}
                height={20}
                className="text-current"
                aria-hidden
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
}

//* =============================================
//*                 LINK ITEM                   =
//*==============================================
type LinkItemProps = {
  href: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

function LinkItem({ href, title, onClick, className }: LinkItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive && 'page'}
      onClick={onClick}
      className={clsx(
        'block rounded-md px-3 py-1 uppercase tracking-wider transition-colors hocusv:!text-textClr-100 [&:not(:hover)]:text-textClr-400',
        className,
        isActive && '!text-textClr-100',
      )}
    >
      {title}
    </Link>
  );
}
