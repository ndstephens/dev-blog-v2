'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6 px-4 xs:gap-8">
      <h1 className="text-balance text-center text-2xl text-textClr-50 xs:text-3xl">
        Something went wrong...
      </h1>
      <button
        onClick={() => reset()}
        className="rounded-2xl border border-primary-500 bg-primary-800 px-4 py-2 text-lg font-semibold text-textClr-50 transition-colors hocusv:bg-primary-900"
      >
        Try again
      </button>
    </div>
  );
}
