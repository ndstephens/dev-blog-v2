import Logo from '@/components/SiteHeader/Logo/Logo';
import SiteNavMobile from '@/components/SiteHeader/SiteNavMobile/SiteNavMobile';
import SiteNavDesktop from '@/components/SiteHeader/SiteNavDesktop/SiteNavDesktop';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 h-headerHeightMobile select-none bg-surface-900/85 xs:h-headerHeightDesktop">
      <div className="absolute inset-0 -z-10 backdrop-blur-sm" />
      <div className="page-padding mx-auto flex h-full max-w-pageWidth items-center justify-between">
        <Logo />
        <SiteNavMobile />
        <SiteNavDesktop />
      </div>
    </header>
  );
}
