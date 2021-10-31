import React from 'react'
import styled from 'styled-components'
import Portal from '@components/atoms/portal'

const StyledPortal = styled.div`
    bottom: 1rem;
    right: 1rem;
`

interface PortalOverlayProps {
    children: any
}

/**
 * Generic portal overlay aligned to screen corner.
 *
 * @todo P314 | Discuss: Container ID is generic, but styles are not. Improve to achieve position independence?
 */
const PortalOverlay: React.FC<PortalOverlayProps> = (props: PortalOverlayProps) => {
    const { children } = props

    return (
        <Portal>
            <StyledPortal className="position-fixed">
                {children}
            </StyledPortal>
        </Portal>
    )
}

export default PortalOverlay
