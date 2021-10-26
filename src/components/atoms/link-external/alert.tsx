interface LinkProps {
  href: string
  children: any
}

/**
 * External link that opens in new tab/window.
 * For security and privacy, tracking and JS interactions are disabled via 'rel'.
 */
export default function LinkExternal({ href, children, ...props }: LinkProps) {
  if (!href) {
    throw 'Property `href` must be a valid string (not: empty/undefined)'
  }

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
