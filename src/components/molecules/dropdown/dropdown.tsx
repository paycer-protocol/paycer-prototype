import React, {useState, useEffect, useRef} from 'react'
import * as Styles from './styles'
import Icon from "@components/atoms/icon";
import { useMediaQuery } from 'react-responsive'

export interface DropdownProps {
    // TODO: implement mouseover
    openBy?: 'mouseover' | 'click'
    children: React.ReactNode
    icon: any
    desktopWidth?: number
    label?: string
}

const Dropdown = (props: DropdownProps) => {
    const dropdownRef = useRef(null)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    const {
        openBy,
        children,
        icon,
        desktopWidth,
        label,
    } = props

    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', function(e) {
            // @ts-ignore
            if (!e?.path.includes(dropdownRef.current)) {
                setOpen(false)
            }
        })
    }, [])

    return (
        <div ref={dropdownRef} className="d-flex justify-content-between align-items-center" onClick={() => setOpen(!open)}>
            <Styles.DropdownOpener className="card mb-0 bg-dark" isOpen={open}>
                <Icon component={icon} size={20} className="opener-svg" />
                {open &&
                <Styles.DropdownContent onClick={(e) => e.stopPropagation()} style={!isTabletOrMobile && desktopWidth ? {'width': desktopWidth } : null} className="card mb-0">
                  <div className="card-body">
                    <Styles.DropdownContentChevron />
                      {children}
                  </div>
                </Styles.DropdownContent>
                }
                {label &&
                    <Styles.DropdownLabel>{label}</Styles.DropdownLabel>
                }
            </Styles.DropdownOpener>
        </div>
    )
}

export default Dropdown
