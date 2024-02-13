import Logo from '@/components/SiteHeader/Logo/Logo';
import SiteNavMobile from '@/components/SiteHeader/SiteNavMobile/SiteNavMobile';
import SiteNavDesktop from '@/components/SiteHeader/SiteNavDesktop/SiteNavDesktop';

export default function SiteHeader() {
  return (
    <header className="h-headerHeightMobile xs:h-headerHeightDesktop sticky top-0 select-none bg-surface-900/80 backdrop-blur-sm backdrop-saturate-150">
      <div className="page-padding mx-auto flex h-full max-w-pageWidth items-center justify-between">
        <Logo />
        <SiteNavMobile />
        <SiteNavDesktop />
      </div>
    </header>
  );
}
