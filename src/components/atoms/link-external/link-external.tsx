import { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any
}

/**
 * External link that opens in new tab/window.
 * For security and privacy, tracking and JS interactions are disabled via 'rel'.
 *
 * @todo P314 | Error handling best practice: Throw + break app or log silently?
 */
export default function LinkExternal({ children, href, ...props }: LinkProps) {
  if (!href) {
    // console.error?('Property `href` must be a valid string, not: empty/undefined.')
    throw 'Property `href` must be a valid string, not: empty/undefined.'
  }

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
