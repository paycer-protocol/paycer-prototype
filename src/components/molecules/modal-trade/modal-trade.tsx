import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import ChildrenType from '../../../types/children'

interface TradeModalProps {
    className?: string
    children: ChildrenType
    content: ChildrenType
    title: string
    show: boolean
    onHide?: () => void
}

/**
 * @todo P83 | WIP - Implement or remove
 */
const StyledModalInner = styled.div``

export default function TradeModal(props: TradeModalProps) {
    const { children, className, content, show, onHide, title } = props

    return (
        <Modal show={show} onHide={onHide ?? (() => { onHide() })} className={className ?? ""}>
            <StyledModalInner>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Trans>{title}</Trans>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    {children}
                </Modal.Footer>
            </StyledModalInner>
        </Modal>
    )
}
