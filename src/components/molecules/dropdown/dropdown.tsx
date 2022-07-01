import React, { useState, useEffect, useRef } from 'react'
import Icon from '@components/atoms/icon'
import { useMediaQuery } from 'react-responsive'
import * as Styles from './styles'

export interface DropdownProps {
  // TODO: implement mouseover
  openBy?: 'mouseover' | 'click'
  children: React.ReactNode
  opener: React.ReactNode
  desktopWidth?: number
}

const Dropdown = (props: DropdownProps) => {
  const dropdownRef = useRef(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

  const {
    openBy,
    children,
    desktopWidth,
    opener,
  } = props

  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      // @ts-ignore
      if (e.path !== undefined && !e.path.includes(dropdownRef.current)) {
        setOpen(false)
      }
    })
  }, [])

  return (
    <div ref={dropdownRef} className="d-flex justify-content-between align-items-center" onClick={() => setOpen(!open)}>
      {opener}
      {open
            && (
            <Styles.DropdownContent onClick={(e) => e.stopPropagation()} style={!isTabletOrMobile && desktopWidth ? { width: desktopWidth } : null} className="card mb-0">
              <div className="card-body">
                <Styles.DropdownContentChevron />
                {children}
              </div>
            </Styles.DropdownContent>
            )}
    </div>
  )
}

export default Dropdown
