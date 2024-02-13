'use client';

import React from 'react';
import clsx from 'clsx';

export default function AnimateHeightWithGrid() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <section className="mt-8 flex flex-col items-start gap-6">
      <button
        className="rounded-md border-2 border-current px-6 py-1 font-semibold text-primary-500 transition-colors hover:text-primary-300"
        type="button"
        onClick={() => setIsExpanded((ps) => !ps)}
      >
        {isExpanded ? 'Hide' : 'Show'} Content
      </button>
      <div
        className={clsx(
          'grid overflow-hidden transition-all duration-300',
          !isExpanded && 'grid-rows-[0fr]',
          isExpanded && 'grid-rows-[1fr]',
        )}
      >
        <div className="min-h-0">
          <p className="!my-1">Very important content.</p>
          <p className="!my-1">Very important content.</p>
          <p className="!my-1">Very important content.</p>
        </div>
      </div>
    </section>
  );
}
