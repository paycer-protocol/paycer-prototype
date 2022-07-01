import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { getRootElement } from './root'

interface PortalProps {
  children: any
}

/**
 * Purely functional, design agnostic portal component.
 */
const Portal: React.FC<PortalProps> = (props: PortalProps) => {
  const { children } = props
  const [isMounted, setIsMounted] = useState(false)
  const rootElement: Element = getRootElement()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  return isMounted
    ? createPortal(children, rootElement)
    : null
}

export default Portal
