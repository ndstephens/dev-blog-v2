import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="border-primary-700 font-display text-primary-500 hocusv:border-primary-300 hocusv:text-primary-300 group flex items-center overflow-hidden border text-lg font-normal uppercase tracking-[0.16em] transition-colors xs:text-[22px]"
    >
      <span className="mt-[-1px] py-[5px] pl-[7px] pr-[3px] leading-none xs:mt-[-2px] xs:py-[7px] xs:pl-[8px] xs:pr-[4px]">
        Nate
      </span>
      <div className="bg-primary-700 group-hocusv:bg-primary-300 w-px self-stretch transition-colors" />
      <span className="mt-[-1px] py-[5px] pl-[7px] pr-[3px] leading-none xs:mt-[-2px] xs:py-[7px] xs:pl-[8px] xs:pr-[4px]">
        Stephens
      </span>
    </Link>
  );
}
