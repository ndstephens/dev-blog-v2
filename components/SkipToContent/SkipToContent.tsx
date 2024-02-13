export function SkipLink() {
  return (
    <a
      href="#start-of-content"
      className="absolute left-8 top-14 z-[99999] h-px w-px overflow-hidden rounded-md bg-surface-800 px-4 py-2 text-xl font-semibold text-textClr-50 outline-2 outline-offset-0 outline-current [clip:rect(1px,1px,1px,1px)] focus:h-auto focus:w-auto focus:[clip:auto]"
    >
      Skip to content
    </a>
  );
}

export function SkipAnchor() {
  return (
    <div
      id="start-of-content"
      className="scroll-mt-headerHeightMobile xs:scroll-mt-headerHeightDesktop"
    />
  );
}
