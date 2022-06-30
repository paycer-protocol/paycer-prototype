import { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any,
  href: string
}

/**
 * External link that opens in new tab/window.
 * For security and privacy, tracking and JS interactions are disabled via 'rel'.
 */
export default function LinkExternal({ children, href, ...props }: LinkProps) {
  return (
    <>
      {href && (
        <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...props}>
          {children}
        </a>
      )}
    </>
  );
}
