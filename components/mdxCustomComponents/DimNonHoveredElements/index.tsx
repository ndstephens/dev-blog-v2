export default function DimNonHoveredElements() {
  return (
    <div className="mx-auto my-12 w-[min(32rem,100%)]">
      <ul className="!m-0 grid !list-none grid-cols-3 gap-[min(2rem,4vw)] !p-0">
        {Array.from({ length: 9 }).map((_, i) => (
          <li
            key={i}
            className="peer !m-0 aspect-square cursor-pointer bg-primary-500 !p-0 transition-opacity peer-hover:opacity-50 [&:has(~_li:hover)]:opacity-50"
          />
        ))}
      </ul>
    </div>
  );
}
