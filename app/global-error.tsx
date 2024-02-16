'use client';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-surface-900 font-sans text-textClr-200 antialiased">
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
      </body>
    </html>
  );
}
