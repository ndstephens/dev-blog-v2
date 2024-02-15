'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Disclosure } from '@headlessui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { AnimatePresence, motion as m } from 'framer-motion';

import { useTocObserver } from '@/lib/hooks/useTocObserver';

export interface TocHeadingType {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content: string;
  slug: string;
  depth: 0 | 1 | 2 | 3 | 4 | 5;
}

interface PostTocProps {
  headings: TocHeadingType[];
  className?: string;
}

const link = cva(
  'block truncate rounded font-medium leading-[1.65rem] tracking-wide text-textClr-400 transition-colors hocusv:text-textClr-50',
  {
    variants: {
      depth: {
        [0]: 'mt-[12px] pl-1 text-[15px]',
        [1]: 'mt-px pl-[20px] text-[14px]',
        [2]: 'mt-px pl-[36px] text-[13px]',
        [3]: 'mt-px pl-[52px] text-[13px]',
        [4]: 'mt-px pl-[70px] text-[13px]',
        [5]: 'mt-px pl-[84px] text-[13px]',
      },
      screen: {
        desktop: '',
        mobile: 'last-of-type:mb-[10px]',
      },
    },
    defaultVariants: {
      depth: 0,
      screen: 'desktop',
    },
  },
);

export function PostTocMobile({ headings, className }: PostTocProps) {
  if (!headings.length) {
    return null;
  }

  return (
    <aside className={`select-none overflow-hidden ${className}`}>
      <Disclosure
        as="nav"
        aria-label="Article" // aria landmark nav identifier
      >
        {({ open }) => (
          // "open" needed for AnimatePresence to work
          // TODO: maybe instead wrap the <h2> around the <button>
          <>
            <Disclosure.Button>
              <h2 className="sectionHeader flex items-center gap-3">
                Table of Contents{' '}
                <ChevronDownIcon
                  aria-hidden
                  className={clsx(
                    'transition-transform',
                    open && '-rotate-180',
                  )}
                  width={16}
                  height={16}
                />
              </h2>
            </Disclosure.Button>
            <AnimatePresence>
              {open && (
                <Disclosure.Panel
                  static
                  as={m.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-64 overflow-y-auto rounded border-b-2 border-surface-800 px-4"
                >
                  {headings.map((heading) => (
                    <a
                      key={heading.slug}
                      href={`#${heading.slug}`}
                      className={link({
                        depth: heading.depth,
                        screen: 'mobile',
                      })}
                    >
                      {heading.content}
                    </a>
                  ))}
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </aside>
  );
}

export function PostTocDesktop({ headings, className }: PostTocProps) {
  const { activeId } = useTocObserver();

  if (!headings.length) {
    return null;
  }

  // TODO: pull the <h2> outside of the <nav> and then wrap all links in <li>'s and wrap those in an <ul>.  Also maybe remove the <aside>.  Fix things on the mobile version to be similar
  return (
    <aside className={`select-none ${className}`}>
      <nav
        aria-label="Article" // aria landmark nav identifier
      >
        <h2 className="sectionHeader">Table of Contents</h2>
        {headings.map((heading) => (
          <a
            href={`#${heading.slug}`}
            className={clsx(
              link({ depth: heading.depth }),
              activeId === heading.slug &&
                'bg-black/10 !text-textClr-50 dark:bg-white/10',
            )}
            key={heading.slug}
          >
            {heading.content}
          </a>
        ))}
      </nav>
    </aside>
  );
}
