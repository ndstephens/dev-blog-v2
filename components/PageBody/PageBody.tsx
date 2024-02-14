import { PropsWithChildren } from 'react';

import { SkipAnchor } from '@/components/SkipToContent/SkipToContent';

export default function PageWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <SkipAnchor />
      <div className="gradient-page-body flex flex-grow flex-col">
        <div className="page-padding mx-auto w-full max-w-pageWidth flex-grow border-surface-800 pb-24 pt-16 min-[1088px]:border-x-2 min-[1088px]:px-[30px]">
          {children}
        </div>
      </div>
    </>
  );
}
