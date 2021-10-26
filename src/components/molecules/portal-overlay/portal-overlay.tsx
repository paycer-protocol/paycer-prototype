import Portal from '../../atoms/portal'
import { selectors } from '../../../config/selectors'

const PortalOverlay = (props) => {
    const { children, ...rest } = props

    const portalRoot = document.getElementById(selectors.portalContainerId)

    return (
        <Portal rootElement={portalRoot} {...rest}>
            <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                {children}
            </div>
        </Portal>
    )
}

export default PortalOverlay
