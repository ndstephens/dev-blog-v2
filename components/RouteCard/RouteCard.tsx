import Link from 'next/link';

interface RouteCardProps {
  href: string;
  title: string;
  body: string;
  gradient: string;
  className?: string;
}

export default function RouteCard({
  href,
  title,
  body,
  gradient,
  className,
}: RouteCardProps) {
  return (
    <li className={`relative h-full ${className}`}>
      <Link href={href} className="group">
        <div
          className={`${gradient} absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hocusv:opacity-70`}
        />
        <div className="flex h-full flex-col items-baseline gap-y-4 overflow-hidden rounded-2xl border border-surface-700 bg-surface-800 px-8 py-10 transition-transform duration-500 group-hocusv:scale-[1.03] lg:px-12">
          <h3
            className={`${gradient} bg-clip-text text-[26px] font-semibold uppercase tracking-wider text-transparent`}
          >
            {title}
          </h3>
          <p className="text-base font-medium tracking-wider text-textClr-400 transition-colors duration-500 group-hocusv:text-textClr-50">
            {body}
          </p>
        </div>
      </Link>
    </li>
  );
}
