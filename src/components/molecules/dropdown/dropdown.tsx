import React, {useState} from 'react'
import * as Styles from './styles'
import Icon from "@components/atoms/icon";
import { useMediaQuery } from 'react-responsive'

export interface DropdownProps {
    openBy?: 'mouseover' | 'click'
    children: React.ReactNode
    icon: any
    desktopWidth?: number
}

const Dropdown = (props: DropdownProps) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    const {
        openBy,
        children,
        icon,
        desktopWidth
    } = props

    const [open, setOpen] = useState(false)

    return (
        <div>
            <Styles.DropdownOpener className="card mb-0 bg-dark" isOpen={open} onClick={() => setOpen(!open)}>
                <Icon component={icon} size={23}/>
            </Styles.DropdownOpener>
            {open &&
                <Styles.DropdownContent style={!isTabletOrMobile && desktopWidth ? {'width': desktopWidth } : null} className="card mb-0">
                    <div className="card-body">
                        <Styles.DropdownContentChevron />
                        {children}
                    </div>
                </Styles.DropdownContent>
            }
        </div>
    )
}

export default Dropdown
