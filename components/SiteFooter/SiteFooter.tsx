import { PropsWithChildren } from 'react';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function SiteFooter() {
  return (
    <div className="select-none bg-surface-800">
      <footer className="mx-auto flex max-w-pageWidth items-center justify-between px-4 py-6 xs:px-6 sm:px-8">
        <p className="mr-16 text-sm text-textClr-400">
          <small className="flex flex-wrap gap-x-1.5 tracking-wider">
            <span className="whitespace-nowrap">All Rights Reserved</span>
            <span className="whitespace-nowrap">
              &copy; {new Date().getFullYear()} Nate Stephens
            </span>
          </small>
        </p>

        <address>
          <ul className="flex gap-1">
            <SocialLink href="https://github.com/ndstephens" title="Github">
              <GitHubLogoIcon
                aria-hidden
                aria-labelledby="github"
                className="text-current"
                width={24}
                height={24}
              />
              <span className="sr-only" id="github">
                Nate Stephens on Github
              </span>
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/ndstephens/"
              title="LinkedIn"
            >
              <LinkedInLogoIcon
                aria-hidden
                aria-labelledby="linkedin"
                className="text-current"
                width={24}
                height={24}
              />
              <span className="sr-only" id="linkedin">
                Nate Stephens on LinkedIn
              </span>
            </SocialLink>
          </ul>
        </address>
      </footer>
    </div>
  );
}

//* =============================================
//*                SOCIAL LINK                  =
//*==============================================
type SocialLinkProps = PropsWithChildren<{
  href: string;
  title: string;
}>;

function SocialLink({ href, title, children }: SocialLinkProps) {
  return (
    <li className="flex items-center" title={title}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-md p-2 text-textClr-400 transition-colors hocusv:text-textClr-100"
      >
        {children}
      </a>
    </li>
  );
}
