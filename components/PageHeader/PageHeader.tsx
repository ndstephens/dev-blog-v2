import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function PageHeader({ className, children }: Props) {
  return (
    <div className="bg-surface-800">
      <div className="page-padding mx-auto max-w-pageWidth">
        <header
          className={`flex min-h-[12rem] flex-col-reverse gap-y-6 pb-8 pt-16 text-textClr-50 xs:pb-12 xs:pt-28 ${className}`}
        >
          {children}
        </header>
      </div>
    </div>
  );
}
