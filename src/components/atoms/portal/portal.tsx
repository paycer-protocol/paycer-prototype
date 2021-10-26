/**
 * @todo Decide for portal solution
 * @todo Outsource selector
 */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// import Portal from 'react-overlays/Portal'

/**
 * Portal HTML element ID.
 */
export const portalRootIdSelector: string = 'portal-root'

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children,
      document.getElementById(portalRootIdSelector))
    : null
}

export default Portal

