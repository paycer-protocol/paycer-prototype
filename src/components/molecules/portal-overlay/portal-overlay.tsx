import React from 'react'
import Portal from '../../atoms/portal'
import { selectors } from '../../../config/selectors'
import styled from 'styled-components'

const StyledPortal = styled.div`
    bottom: 1rem;
    right: 1rem;
`

interface PortalOverlayProps {
    children: any
}

/**
 * Generic portal overlay aligned to bottom-right page corner.
 *
 * @todo P314 | Discuss: Container ID is generic, but styles are not. Improve to achieve position independence?
 */
const PortalOverlay: React.FC<PortalOverlayProps> = (props: PortalOverlayProps) => {
    const { children } = props
    const portalRoot = document.getElementById(selectors.portalContainerId)

    return (
        <Portal rootElement={portalRoot}>
            <StyledPortal className="position-fixed">
                {children}
            </StyledPortal>
        </Portal>
    )
}

export default PortalOverlay
