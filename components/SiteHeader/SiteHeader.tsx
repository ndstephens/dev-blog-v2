import Logo from '@/components/SiteHeader/Logo/Logo';
import SiteNavMobile from '@/components/SiteHeader/SiteNavMobile/SiteNavMobile';
import SiteNavDesktop from '@/components/SiteHeader/SiteNavDesktop/SiteNavDesktop';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 h-16 select-none bg-surface-900/80 backdrop-blur-sm backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-pageWidth items-center justify-between px-4 xs:px-6 sm:px-8">
        <Logo />
        <SiteNavMobile />
        <SiteNavDesktop />
      </div>
    </header>
  );
}
