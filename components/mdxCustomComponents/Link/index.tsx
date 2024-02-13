import Link from 'next/link';

type CustomLinkProps = React.ComponentPropsWithoutRef<'a'>;

export default function CustomLink({
  children,
  href,
  ...props
}: CustomLinkProps) {
  const isExternalLink = href?.startsWith('http');
  if (isExternalLink) {
    return (
      <a
        href={href}
        {...props}
        target="_blank"
        rel="noreferrer noopener"
        className="linkHoverStyles"
      >
        {children}
        <span className="ml-[2px]">↗</span>
      </a>
    );
  }

  const isTargetLink = href?.startsWith('#');
  if (isTargetLink) {
    return (
      <a href={href} {...props} className="hocusv:linkHoverStyles">
        {children}
      </a>
    );
  }

  return (
    <Link href={href || ''} {...props} className="linkHoverStyles">
      {children}
    </Link>
  );
}
