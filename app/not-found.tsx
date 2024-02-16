export default function NotFoundPage() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6 px-4 xs:gap-8">
      <h1 className="text-balance text-center text-2xl text-textClr-50 xs:text-3xl">
        Sorry, can&apos;t find that page
      </h1>
      <span className="text-4xl xs:text-6xl">🤔</span>
    </div>
  );
}
