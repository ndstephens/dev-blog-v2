import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function PageWrapper({ children, className }: Props) {
  return (
    <div className="gradient-page-body flex-grow">
      <div
        className={`page-padding mx-auto py-[10vh] sm:py-[16vh] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
