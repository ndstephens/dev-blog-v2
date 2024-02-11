import Logo from '@/components/SiteHeader/Logo/Logo';
import SiteNavDesktop from '@/components/SiteHeader/SiteNavDesktop/SiteNavDesktop';

export default function SiteHeader() {
  return (
    <header className="bg-surface-900/80 sticky top-0 z-10 h-16 select-none backdrop-blur-sm backdrop-saturate-150">
      <div className="max-w-pageWidth mx-auto flex h-full items-center justify-between px-8">
        <Logo />
        <SiteNavDesktop />
      </div>
    </header>
  );
}
